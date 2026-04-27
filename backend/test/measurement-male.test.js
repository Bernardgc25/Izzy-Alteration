const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const { expect } = chai;

// Handle both default and named exports of chai-http
const chaiHttpPlugin = typeof chaiHttp === 'function' ? chaiHttp : chaiHttp.default;
chai.use(chaiHttpPlugin);

// Path to the router
const measurementMaleRouter = require('../routes/measurement-male-route');

// Helper: run a single SQL statement and return a Promise
const runSql = (db, sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

// Helper: create all tables, indexes and trigger
const setupDatabase = async (db) => {
  // Create MaleMeasurement table
  await runSql(db, `CREATE TABLE IF NOT EXISTS MaleMeasurement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    neck DECIMAL(5,2),
    shoulder_length DECIMAL(5,2),
    arm_length DECIMAL(5,2),
    across_front DECIMAL(5,2),
    chest_circumference DECIMAL(5,2),
    waist DECIMAL(5,2),
    hip_circumference DECIMAL(5,2),
    total_rise DECIMAL(5,2),
    thigh DECIMAL(5,2),
    knee DECIMAL(5,2),
    calf DECIMAL(5,2),
    ankle DECIMAL(5,2),
    bicep DECIMAL(5,2),
    elbow DECIMAL(5,2),
    wrist DECIMAL(5,2),
    inseam_ankle DECIMAL(5,2),
    inseam_floor DECIMAL(5,2),
    neck_waist DECIMAL(5,2),
    neck_floor DECIMAL(5,2),
    waist_floor DECIMAL(5,2),
    height DECIMAL(5,2),
    client_name TEXT NOT NULL,
    size_number TEXT,
    measurement_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create indexes
  for (const field of ['client_name', 'measurement_date', 'size_number']) {
    await runSql(db, `CREATE INDEX IF NOT EXISTS idx_malemeasurement_${field} ON MaleMeasurement(${field})`);
  }

  // Create trigger for auto-updating updated_at
  await runSql(db, `CREATE TRIGGER IF NOT EXISTS update_malemeasurement_timestamp 
    AFTER UPDATE ON MaleMeasurement
    BEGIN
      UPDATE MaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END`);
};

// Sample measurement data (includes all required fields)
const sampleMeasurement = {
  neck: 38.5,
  shoulder_length: 45.0,
  arm_length: 62.0,
  across_front: 42.0,
  chest_circumference: 98.0,
  waist: 82.0,
  hip_circumference: 96.0,
  total_rise: 28.0,
  thigh: 56.0,
  knee: 38.0,
  calf: 36.0,
  ankle: 24.0,
  bicep: 32.0,
  elbow: 28.0,
  wrist: 18.0,
  inseam_ankle: 72.0,
  inseam_floor: 100.0,
  neck_waist: 45.0,
  neck_floor: 140.0,
  waist_floor: 105.0,
  height: 175.0,
  client_name: 'John Doe',
  size_number: 'M',
  measurement_date: '2025-02-20'
};

describe('Male Measurement CRUD Operations', () => {
  let app;
  let testDbPath;

  before(async () => {
    // Use a temporary file on disk so the router and our setup share the same database
    testDbPath = './test-database.sqlite';
    process.env.TEST_DATABASE = testDbPath;

    // Force a fresh load of the router with the new TEST_DATABASE value
    delete require.cache[require.resolve('../routes/measurement-male-route')];
    const freshRouter = require('../routes/measurement-male-route');

    // Create Express app and mount the router
    const apiRouter = express.Router();
    apiRouter.use('/measurements/male', freshRouter);
    app = express();
    app.use(express.json());
    app.use('/api', apiRouter);

    // Set up the database schema using a separate connection to the same file
    const setupDb = new sqlite3.Database(testDbPath);
    await setupDatabase(setupDb);
    setupDb.close();
  });

  after((done) => {
    // Delete the test database file after all tests finish
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    done();
  });

  let createdId;

  it('should CREATE a new male measurement via POST /api/measurements/male', async () => {
    const res = await chai.request(app)
      .post('/api/measurements/male')
      .send(sampleMeasurement);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    createdId = res.body.id;
  });

  it('should GET all male measurements via GET /api/measurements/male', async () => {
    const res = await chai.request(app).get('/api/measurements/male');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array').with.lengthOf.at.least(1);
    const measurement = res.body.find(m => m.id === createdId);
    expect(measurement).to.include({ client_name: 'John Doe', size_number: 'M' });
  });

  it('should GET a specific measurement by id via GET /api/measurements/male/:id', async () => {
    const res = await chai.request(app).get(`/api/measurements/male/${createdId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.include({ id: createdId, client_name: 'John Doe' });
  });

  it('should return 404 for a non-existent measurement id', async () => {
    const res = await chai.request(app).get('/api/measurements/male/999999');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error', 'Measurement not found');
  });

  it('should UPDATE an existing measurement via PUT /api/measurements/male/:id', async () => {
    const updatedData = { ...sampleMeasurement, client_name: 'John Updated', size_number: 'L' };
    const res = await chai.request(app)
      .put(`/api/measurements/male/${createdId}`)
      .send(updatedData);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Measurement updated successfully');

    // Verify update
    const getRes = await chai.request(app).get(`/api/measurements/male/${createdId}`);
    expect(getRes.body).to.include({ client_name: 'John Updated', size_number: 'L' });
  });

  it('should return 404 when updating a non-existent measurement', async () => {
    const res = await chai.request(app)
      .put('/api/measurements/male/999999')
      .send(sampleMeasurement);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error', 'Measurement not found');
  });

  it('should DELETE a measurement via DELETE /api/measurements/male/:id', async () => {
    const res = await chai.request(app).delete(`/api/measurements/male/${createdId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Measurement deleted successfully');

    // Verify deletion
    const getRes = await chai.request(app).get(`/api/measurements/male/${createdId}`);
    expect(getRes).to.have.status(404);
  });

  it('should return 404 when deleting a non-existent measurement', async () => {
    const res = await chai.request(app).delete('/api/measurements/male/999999');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('error', 'Measurement not found');
  });
});