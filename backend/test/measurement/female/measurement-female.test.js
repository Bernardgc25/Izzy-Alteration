// =============================================================================
// File: backend/test/measurement/female/measurement-female.test.js
// HOW TO RUN:
//   From the project root, go to backend directory and execute:
//       npm run test:female
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
const TEST_DB_FILE = path.join(__dirname, 'measurement-female-seed-test.sqlite');

// -----------------------------------------------------------------------------
// Helper: run migration SQL on the test database
// -----------------------------------------------------------------------------
function runMigration(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Create table
      db.run(`CREATE TABLE IF NOT EXISTS FemaleMeasurement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        neck DECIMAL(5,2),
        shoulder_length DECIMAL(5,2),
        arm_length DECIMAL(5,2),
        chest_circumference DECIMAL(5,2),
        under_bust DECIMAL(5,2),
        waist DECIMAL(5,2),
        hipbone_circumference DECIMAL(5,2),
        hip_circumference DECIMAL(5,2),
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

      // 2. Create indexes
      ['client_name', 'measurement_date', 'size_number'].forEach(field => {
        db.run(`CREATE INDEX IF NOT EXISTS idx_femalemeasurement_${field}
                ON FemaleMeasurement(${field})`, (err) => {
          if (err) return reject(err);
        });
      });

      // 3. Create update trigger (fixed syntax)
      db.run(`CREATE TRIGGER IF NOT EXISTS update_femalemeasurement_timestamp 
        AFTER UPDATE ON FemaleMeasurement
        FOR EACH ROW
        BEGIN
          UPDATE FemaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
        END;`, (err) => {
        if (err) return reject(err);
      });
    });

    // Close only after all serialized statements finish
    db.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// -----------------------------------------------------------------------------
// Suite Setup & Teardown
// -----------------------------------------------------------------------------
describe('Measurement Female (Routes + Migration)', function () {
  let app;
  let testDb; // separate connection for schema checks

  before(async function () {
    // 1. Create a fresh test database file
    if (fs.existsSync(TEST_DB_FILE)) fs.unlinkSync(TEST_DB_FILE);

    // 2. Run migration on it
    const migrationDb = new sqlite3.Database(TEST_DB_FILE);
    await runMigration(migrationDb);

    // 3. Set environment so that the routes module uses this database
    process.env.TEST_DATABASE = TEST_DB_FILE;

    // 4. Build Express app with the actual API router
    const apiRouter = require('../../../api');  // mounts measurement-female-routes
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
    it('should have the FemaleMeasurement table', function (done) {
      testDb.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='FemaleMeasurement'",
        (err, row) => {
          if (err) return done(err);
          expect(row).to.not.be.undefined;
          done();
        }
      );
    });

    it('should have all required columns with expected types', function (done) {
      testDb.all("PRAGMA table_info('FemaleMeasurement')", (err, columns) => {
        if (err) return done(err);
        const colNames = columns.map(c => c.name);
        const expected = [
          'id', 'neck', 'shoulder_length', 'arm_length', 'chest_circumference',
          'under_bust', 'waist', 'hipbone_circumference', 'hip_circumference',
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
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='FemaleMeasurement'",
        (err, indexes) => {
          if (err) return done(err);
          const names = indexes.map(i => i.name);
          expect(names).to.include.members([
            'idx_femalemeasurement_client_name',
            'idx_femalemeasurement_measurement_date',
            'idx_femalemeasurement_size_number'
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
      const all = (sql, params = []) =>
        new Promise((resolve, reject) => {
          testDb.all(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
          });
        });

      // Insert a test row
      const result = await run(
        'INSERT INTO FemaleMeasurement (client_name, measurement_date) VALUES (?, ?)',
        ['trigger_test', '2025-06-01']
      );
      const id = result.lastID;

      // Fetch initial timestamps
      const initialRow = await get(
        'SELECT created_at, updated_at FROM FemaleMeasurement WHERE id = ?',
        [id]
      );
      const initialUpdated = initialRow.updated_at;

      // Wait long enough to guarantee a new second (CURRENT_TIMESTAMP has seconds resolution)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update the row
      await run(
        'UPDATE FemaleMeasurement SET client_name = ? WHERE id = ?',
        ['updated_name', id]
      );

      // Fetch new updated_at
      const updatedRow = await get(
        'SELECT updated_at FROM FemaleMeasurement WHERE id = ?',
        [id]
      );

      expect(updatedRow.updated_at).to.not.equal(initialUpdated);

      // Clean up – remove the test row to avoid contaminating API tests
      await run('DELETE FROM FemaleMeasurement WHERE id = ?', [id]);
    });
  });

  // ---------------------------------------------------------------------------
  // API Route Tests (CRUD)
  // ---------------------------------------------------------------------------
  describe('API /api/measurements/female', function () {
    /** Helper to insert a valid record and return the ID */
    async function insertSample(bodyOverride = {}) {
      const defaultBody = {
        neck: 35,
        shoulder_length: 14,
        arm_length: 55,
        chest_circumference: 90,
        under_bust: 80,
        waist: 70,
        hipbone_circumference: 95,
        hip_circumference: 100,
        thigh: 58,
        knee: 36,
        calf: 34,
        ankle: 22,
        bicep: 28,
        elbow: 24,
        wrist: 16,
        inseam_ankle: 72,
        inseam_floor: 74,
        neck_waist: 40,
        neck_floor: 130,
        waist_floor: 100,
        height: 165,
        client_name: 'Jane Doe',
        size_number: 'M',
        measurement_date: '2025-06-01'
      };
      const body = { ...defaultBody, ...bodyOverride };
      const res = await request(app)
        .post('/api/measurements/female')
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
        const res = await request(app).get('/api/measurements/female');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.empty;
      });

      it('should return all inserted records', async function () {
        await insertSample({ client_name: 'Alice' });
        await insertSample({ client_name: 'Bob' });
        const res = await request(app).get('/api/measurements/female');
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
        const res = await request(app).get(`/api/measurements/female/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.include({
          id,
          client_name: 'Charlie',
          neck: 35
        });
      });

      it('should return 404 for a non‑existent ID', async function () {
        const res = await request(app).get('/api/measurements/female/99999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Measurement not found');
      });

      it('should return 404 for an invalid ID format (non‑numeric)', async function () {
        // The route returns 404 because 'abc' is cast to 0, which doesn't exist
        const res = await request(app).get('/api/measurements/female/abc');
        expect(res.status).to.equal(404);
      });
    });

    // ------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------
    describe('POST /', function () {
      it('should create a new measurement and return its ID', async function () {
        const res = await request(app)
          .post('/api/measurements/female')
          .send({
            neck: 36,
            shoulder_length: 15,
            arm_length: 56,
            chest_circumference: 92,
            under_bust: 82,
            waist: 72,
            hipbone_circumference: 96,
            hip_circumference: 102,
            thigh: 60,
            knee: 37,
            calf: 35,
            ankle: 23,
            bicep: 29,
            elbow: 25,
            wrist: 17,
            inseam_ankle: 73,
            inseam_floor: 75,
            neck_waist: 41,
            neck_floor: 131,
            waist_floor: 101,
            height: 166,
            client_name: 'Diana',
            size_number: 'L',
            measurement_date: '2025-07-01'
          });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id').that.is.a('number');
      });

      it('should fail with 500 when required client_name is missing', async function () {
        const res = await request(app)
          .post('/api/measurements/female')
          .send({
            neck: 36,
            measurement_date: '2025-07-01'
          });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error').that.includes('NOT NULL');
      });

      it('should fail with 500 when required measurement_date is missing', async function () {
        const res = await request(app)
          .post('/api/measurements/female')
          .send({
            client_name: 'No Date'
          });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error').that.includes('NOT NULL');
      });

      it('should still insert when optional fields are omitted (they become NULL)', async function () {
        const res = await request(app)
          .post('/api/measurements/female')
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
          .put(`/api/measurements/female/${id}`)
          .send({
            neck: 38,
            shoulder_length: 16,
            arm_length: 58,
            chest_circumference: 94,
            under_bust: 84,
            waist: 74,
            hipbone_circumference: 98,
            hip_circumference: 104,
            thigh: 62,
            knee: 38,
            calf: 36,
            ankle: 24,
            bicep: 30,
            elbow: 26,
            wrist: 18,
            inseam_ankle: 74,
            inseam_floor: 76,
            neck_waist: 42,
            neck_floor: 132,
            waist_floor: 102,
            height: 167,
            client_name: 'Eve Updated',
            size_number: 'XL',
            measurement_date: '2025-09-01'
          });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Measurement updated successfully');

        // Verify the update
        const getRes = await request(app).get(`/api/measurements/female/${id}`);
        expect(getRes.body.client_name).to.equal('Eve Updated');
        expect(getRes.body.neck).to.equal(38);
      });

      it('should return 404 when ID does not exist', async function () {
        const res = await request(app)
          .put('/api/measurements/female/99999')
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
          .put(`/api/measurements/female/${id}`)
          .send({ neck: 39 }); // client_name and measurement_date missing
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
        const res = await request(app).delete(`/api/measurements/female/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Measurement deleted successfully');

        // Confirm it's gone
        const getRes = await request(app).get(`/api/measurements/female/${id}`);
        expect(getRes.status).to.equal(404);
      });

      it('should return 404 when deleting a non‑existent ID', async function () {
        const res = await request(app).delete('/api/measurements/female/99999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Measurement not found');
      });
    });
  });
});