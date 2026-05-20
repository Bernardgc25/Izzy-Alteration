// =============================================================================
// File: backend/test/measurement/male/measurement-male.test.js
// HOW TO RUN:
//   From the project root, go to backend directory and execute:
//       npm run test:male
//
// Or add a script in package.json:
//   "test:male": "mocha test/measurement/male/measurement-male.test.js --timeout 5000"
// =============================================================================

const request = require('supertest');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const express = require('express');

// -----------------------------------------------------------------------------
// Test configuration
// -----------------------------------------------------------------------------
const TEST_DB_FILE = path.join(__dirname, 'measurement-male-seed-test.sqlite');

// -----------------------------------------------------------------------------
// Helper: run migration SQL on the test database for male measurements
// -----------------------------------------------------------------------------
function runMigration(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Create MaleMeasurement table
      db.run(`CREATE TABLE IF NOT EXISTS MaleMeasurement (
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
      )`, (err) => { if (err) return reject(err); });

      // 2. Create indexes on commonly queried columns
      ['client_name', 'measurement_date', 'size_number'].forEach(field => {
        db.run(`CREATE INDEX IF NOT EXISTS idx_malemeasurement_${field}
                ON MaleMeasurement(${field})`, (err) => {
          if (err) return reject(err);
        });
      });

      // 3. Create trigger to auto-update updated_at on row modification
      db.run(`CREATE TRIGGER IF NOT EXISTS update_malemeasurement_timestamp 
        AFTER UPDATE ON MaleMeasurement
        FOR EACH ROW
        BEGIN
          UPDATE MaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
        END;`, (err) => {
        if (err) return reject(err);
      });
    });

    // Close after all serialized statements finish
    db.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// -----------------------------------------------------------------------------
// Suite Setup & Teardown
// -----------------------------------------------------------------------------
describe('Measurement Male (Routes + Migration)', function () {
  let app;
  let testDb; // separate connection for schema validation

  before(async function () {
    // 1. Create a fresh test database file
    if (fs.existsSync(TEST_DB_FILE)) fs.unlinkSync(TEST_DB_FILE);

    // 2. Run migration on it
    const migrationDb = new sqlite3.Database(TEST_DB_FILE);
    await runMigration(migrationDb);

    // 3. Set environment so that the routes module uses this database
    process.env.TEST_DATABASE = TEST_DB_FILE;

    // 4. Build Express app with the actual API router
    const apiRouter = require('../../api');  // mounts measurement-male-routes
    const expressApp = express();
    expressApp.use(express.json());
    expressApp.use('/api', apiRouter);
    app = expressApp;

    // 5. Open a separate connection for schema validation
    testDb = new sqlite3.Database(TEST_DB_FILE);
  });

  after(async function () {
    // Close validation connection and remove test database file
    if (testDb) await new Promise(resolve => testDb.close(resolve));
    if (fs.existsSync(TEST_DB_FILE)) fs.unlinkSync(TEST_DB_FILE);
    delete process.env.TEST_DATABASE;
  });

  // ---------------------------------------------------------------------------
  // Migration Schema Tests
  // ---------------------------------------------------------------------------
  describe('Database Schema (migration)', function () {
    it('should have the MaleMeasurement table', function (done) {
      testDb.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='MaleMeasurement'",
        (err, row) => {
          if (err) return done(err);
          expect(row).to.not.be.undefined;
          done();
        }
      );
    });

    it('should have all required columns with expected types', function (done) {
      testDb.all("PRAGMA table_info('MaleMeasurement')", (err, columns) => {
        if (err) return done(err);
        const colNames = columns.map(c => c.name);
        const expected = [
          'id', 'neck', 'shoulder_length', 'arm_length', 'across_front',
          'chest_circumference', 'waist', 'hip_circumference', 'total_rise',
          'thigh', 'knee', 'calf', 'ankle', 'bicep', 'elbow', 'wrist',
          'inseam_ankle', 'inseam_floor', 'neck_waist', 'neck_floor',
          'waist_floor', 'height', 'client_name', 'size_number',
          'measurement_date', 'created_at', 'updated_at'
        ];
        expect(colNames).to.have.members(expected);
        done();
      });
    });

    it('should have indexes on client_name, measurement_date, and size_number', function (done) {
      testDb.all(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='MaleMeasurement'",
        (err, indexes) => {
          if (err) return done(err);
          const names = indexes.map(i => i.name);
          expect(names).to.include.members([
            'idx_malemeasurement_client_name',
            'idx_malemeasurement_measurement_date',
            'idx_malemeasurement_size_number'
          ]);
          done();
        }
      );
    });

    it('should fire trigger and update updated_at on UPDATE', async function () {
      // Helper to run db queries as promises
      const run = (sql, params = []) =>
        new Promise((resolve, reject) => {
          testDb.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve(this);
          });
        });
      const get = (sql, params = []) =>
        new Promise((resolve, reject) => {
          testDb.get(sql, params, (err, row) => {
            if (err) return reject(err);
            resolve(row);
          });
        });

      // Insert a test row
      const result = await run(
        'INSERT INTO MaleMeasurement (client_name, measurement_date) VALUES (?, ?)',
        ['trigger_test', '2025-06-01']
      );
      const id = result.lastID;

      // Fetch initial timestamps
      const initialRow = await get(
        'SELECT created_at, updated_at FROM MaleMeasurement WHERE id = ?',
        [id]
      );
      const initialUpdated = initialRow.updated_at;

      // Wait long enough to guarantee a new second (CURRENT_TIMESTAMP has seconds resolution)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update the row
      await run(
        'UPDATE MaleMeasurement SET client_name = ? WHERE id = ?',
        ['updated_name', id]
      );

      // Fetch new updated_at
      const updatedRow = await get(
        'SELECT updated_at FROM MaleMeasurement WHERE id = ?',
        [id]
      );

      expect(updatedRow.updated_at).to.not.equal(initialUpdated);

      // Clean up – remove the test row to avoid contaminating API tests
      await run('DELETE FROM MaleMeasurement WHERE id = ?', [id]);
    });
  });

  // ---------------------------------------------------------------------------
  // API Route Tests (CRUD)
  // ---------------------------------------------------------------------------
  describe('API /api/measurements/male', function () {
    /** Helper to insert a valid record and return the ID */
    async function insertSample(bodyOverride = {}) {
      const defaultBody = {
        neck: 38,
        shoulder_length: 16,
        arm_length: 60,
        across_front: 42,
        chest_circumference: 100,
        waist: 85,
        hip_circumference: 100,
        total_rise: 28,
        thigh: 55,
        knee: 37,
        calf: 36,
        ankle: 24,
        bicep: 32,
        elbow: 26,
        wrist: 18,
        inseam_ankle: 75,
        inseam_floor: 78,
        neck_waist: 45,
        neck_floor: 135,
        waist_floor: 105,
        height: 175,
        client_name: 'John Doe',
        size_number: 'L',
        measurement_date: '2025-06-01'
      };
      const body = { ...defaultBody, ...bodyOverride };
      const res = await request(app)
        .post('/api/measurements/male')
        .send(body)
        .expect(201);
      return res.body.id;
    }

    // ------------------------------------------------------------------
    // GET ALL
    // ------------------------------------------------------------------
    describe('GET /', function () {
      it('should return an empty array when no records exist', async function () {
        // Database is now empty because the trigger test cleaned up after itself
        const res = await request(app).get('/api/measurements/male');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.empty;
      });

      it('should return all inserted records', async function () {
        await insertSample({ client_name: 'Alice' });
        await insertSample({ client_name: 'Bob' });
        const res = await request(app).get('/api/measurements/male');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf(2);
        const names = res.body.map(r => r.client_name);
        expect(names).to.have.members(['Alice', 'Bob']);
      });
    });

    // ------------------------------------------------------------------
    // GET BY ID
    // ------------------------------------------------------------------
    describe('GET /:id', function () {
      it('should return a single record for a valid ID', async function () {
        const id = await insertSample({ client_name: 'Charlie' });
        const res = await request(app).get(`/api/measurements/male/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.include({
          id,
          client_name: 'Charlie',
          neck: 38
        });
      });

      it('should return 404 for a non‑existent ID', async function () {
        const res = await request(app).get('/api/measurements/male/99999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Measurement not found');
      });

      it('should return 404 for an invalid ID format (non‑numeric)', async function () {
        // The route returns 404 because 'abc' is cast to 0, which doesn't exist
        const res = await request(app).get('/api/measurements/male/abc');
        expect(res.status).to.equal(404);
      });
    });

    // ------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------
    describe('POST /', function () {
      it('should create a new measurement and return its ID', async function () {
        const res = await request(app)
          .post('/api/measurements/male')
          .send({
            neck: 39,
            shoulder_length: 17,
            arm_length: 61,
            across_front: 44,
            chest_circumference: 102,
            waist: 86,
            hip_circumference: 101,
            total_rise: 29,
            thigh: 56,
            knee: 38,
            calf: 37,
            ankle: 25,
            bicep: 33,
            elbow: 27,
            wrist: 19,
            inseam_ankle: 76,
            inseam_floor: 79,
            neck_waist: 46,
            neck_floor: 136,
            waist_floor: 106,
            height: 176,
            client_name: 'David',
            size_number: 'XL',
            measurement_date: '2025-07-01'
          });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id').that.is.a('number');
      });

      it('should fail with 500 when required client_name is missing', async function () {
        const res = await request(app)
          .post('/api/measurements/male')
          .send({
            neck: 40,
            measurement_date: '2025-07-01'
          });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error').that.includes('NOT NULL');
      });

      it('should fail with 500 when required measurement_date is missing', async function () {
        const res = await request(app)
          .post('/api/measurements/male')
          .send({
            client_name: 'No Date'
          });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error').that.includes('NOT NULL');
      });

      it('should still insert when optional fields are omitted (they become NULL)', async function () {
        const res = await request(app)
          .post('/api/measurements/male')
          .send({
            client_name: 'OptionalOmit',
            measurement_date: '2025-08-01'
          });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
      });
    });

    // ------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------
    describe('PUT /:id', function () {
      it('should update an existing measurement and return success message', async function () {
        const id = await insertSample({ client_name: 'Eve' });
        const res = await request(app)
          .put(`/api/measurements/male/${id}`)
          .send({
            neck: 41,
            shoulder_length: 18,
            arm_length: 62,
            across_front: 45,
            chest_circumference: 105,
            waist: 88,
            hip_circumference: 103,
            total_rise: 30,
            thigh: 58,
            knee: 39,
            calf: 38,
            ankle: 26,
            bicep: 34,
            elbow: 28,
            wrist: 20,
            inseam_ankle: 77,
            inseam_floor: 80,
            neck_waist: 47,
            neck_floor: 137,
            waist_floor: 107,
            height: 178,
            client_name: 'Eve Updated',
            size_number: 'XXL',
            measurement_date: '2025-09-01'
          });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Measurement updated successfully');

        // Verify the update
        const getRes = await request(app).get(`/api/measurements/male/${id}`);
        expect(getRes.body.client_name).to.equal('Eve Updated');
        expect(getRes.body.neck).to.equal(41);
      });

      it('should return 404 when ID does not exist', async function () {
        const res = await request(app)
          .put('/api/measurements/male/99999')
          .send({
            client_name: 'Ghost',
            measurement_date: '2025-01-01'
          });
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Measurement not found');
      });

      it('should fail with 500 if required fields are missing in update', async function () {
        const id = await insertSample({ client_name: 'FailUpdate' });
        const res = await request(app)
          .put(`/api/measurements/male/${id}`)
          .send({ neck: 42 }); // client_name and measurement_date missing
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error').that.includes('NOT NULL');
      });
    });

    // ------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------
    describe('DELETE /:id', function () {
      it('should delete a measurement and return success message', async function () {
        const id = await insertSample({ client_name: 'DeleteMe' });
        const res = await request(app).delete(`/api/measurements/male/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Measurement deleted successfully');

        // Confirm it's gone
        const getRes = await request(app).get(`/api/measurements/male/${id}`);
        expect(getRes.status).to.equal(404);
      });

      it('should return 404 when deleting a non‑existent ID', async function () {
        const res = await request(app).delete('/api/measurements/male/99999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Measurement not found');
      });
    });
  });
});