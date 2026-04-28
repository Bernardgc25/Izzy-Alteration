const express = require('express');
const sqlite3 = require('sqlite3');
const { expect } = require('chai');
const request = require('supertest');
const fs = require('fs');

// (No top-level require of the router)

const runSql = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

const createTables = async (db) => {
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

  for (const field of ['client_name', 'measurement_date', 'size_number']) {
    await runSql(db, `CREATE INDEX IF NOT EXISTS idx_malemeasurement_${field} ON MaleMeasurement(${field})`);
  }

  await runSql(db, `CREATE TRIGGER IF NOT EXISTS update_malemeasurement_timestamp 
    AFTER UPDATE ON MaleMeasurement
    BEGIN
      UPDATE MaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END`);
};

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
  let measurementMaleRouter; // will hold the router after loading

  before(async function() {
    this.timeout(5000);

    testDbPath = './test-database.sqlite';
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }

    // 1. Create the database file and tables before the router is loaded
    const setupDb = new sqlite3.Database(testDbPath);
    await createTables(setupDb);
    setupDb.close();

    // 2. Set environment variable so the router uses the test database
    process.env.TEST_DATABASE = testDbPath;

    // 3. NOW load the router (it will open the test database and see the table)
    measurementMaleRouter = require('../features/measurement/male/measurement-male-routes');

    // 4. Set up the Express app
    const apiRouter = express.Router();
    apiRouter.use('/measurements/male', measurementMaleRouter);
    app = express();
    app.use(express.json());
    app.use('/api', apiRouter);
  });

  after(() => {
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    delete process.env.TEST_DATABASE;
  });

  let createdId;

  it('should CREATE a new male measurement via POST /api/measurements/male', async () => {
    const res = await request(app)
      .post('/api/measurements/male')
      .send(sampleMeasurement);

    // Log detailed error if not 201
    if (res.status !== 201) {
      console.error('POST error response:', res.body);
    }
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    createdId = res.body.id;
  });

  it('should GET all male measurements via GET /api/measurements/male', async () => {
    const res = await request(app)
      .get('/api/measurements/male')
      .expect(200);

    expect(res.body).to.be.an('array').with.lengthOf.at.least(1);
    const measurement = res.body.find(m => m.id === createdId);
    expect(measurement).to.include({ client_name: 'John Doe', size_number: 'M' });
  });

  it('should GET a specific measurement by id via GET /api/measurements/male/:id', async () => {
    const res = await request(app)
      .get(`/api/measurements/male/${createdId}`)
      .expect(200);

    expect(res.body).to.include({ id: createdId, client_name: 'John Doe' });
  });

  it('should return 404 for a non-existent measurement id', async () => {
    await request(app)
      .get('/api/measurements/male/999999')
      .expect(404)
      .expect({ error: 'Measurement not found' });
  });

  it('should UPDATE an existing measurement via PUT /api/measurements/male/:id', async () => {
    const updatedData = { ...sampleMeasurement, client_name: 'John Updated', size_number: 'L' };
    await request(app)
      .put(`/api/measurements/male/${createdId}`)
      .send(updatedData)
      .expect(200)
      .expect({ message: 'Measurement updated successfully' });

    const getRes = await request(app)
      .get(`/api/measurements/male/${createdId}`)
      .expect(200);
    expect(getRes.body).to.include({ client_name: 'John Updated', size_number: 'L' });
  });

  it('should return 404 when updating a non-existent measurement', async () => {
    await request(app)
      .put('/api/measurements/male/999999')
      .send(sampleMeasurement)
      .expect(404)
      .expect({ error: 'Measurement not found' });
  });

  it('should DELETE a measurement via DELETE /api/measurements/male/:id', async () => {
    await request(app)
      .delete(`/api/measurements/male/${createdId}`)
      .expect(200)
      .expect({ message: 'Measurement deleted successfully' });

    await request(app)
      .get(`/api/measurements/male/${createdId}`)
      .expect(404);
  });

  it('should return 404 when deleting a non-existent measurement', async () => {
    await request(app)
      .delete('/api/measurements/male/999999')
      .expect(404)
      .expect({ error: 'Measurement not found' });
  });
});