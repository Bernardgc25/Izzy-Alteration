**CODE 1 - File: measurement-male-routes.js**  
[
  const express = require('express');
  const sqlite3 = require('sqlite3');
  const db = new sqlite3.Database(process.env.TEST_DATABASE || './measurement-male-database.sqlite');

  const measurementMaleRouter = express.Router();

  // GET /api/measurements/male - Get all male measurements
  measurementMaleRouter.get('/', (req, res) => {
    db.all('SELECT * FROM MaleMeasurement', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
  });

  // GET /api/measurements/male/:id - Get a specific male measurement by ID
  measurementMaleRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM MaleMeasurement WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: 'Measurement not found' });
      }
    });
  });

  // POST /api/measurements/male - Create a new male measurement
  measurementMaleRouter.post('/', (req, res) => {
    const {
      neck,                 // A
      shoulder_length,      // B
      arm_length,           // C
      across_front,         // D  
      chest_circumference,  // E
      waist,                // F
      hip_circumference,    // G
      total_rise,           // H
      thigh,                // I
      knee,                 // J
      calf,                 // K
      ankle,                // L
      bicep,                // M
      elbow,                // N
      wrist,                // O
      inseam_ankle,         // P
      inseam_floor,         // Q
      neck_waist,           // R
      neck_floor,           // S
      waist_floor,          // T
      height,               // U
      client_name,
      size_number,
      measurement_date
    } = req.body;

    // Fixed: now has 24 placeholders (one for each column)
    const sql = `INSERT INTO MaleMeasurement (
      neck, shoulder_length, arm_length, across_front, chest_circumference, waist, hip_circumference, total_rise,
      thigh, knee, calf, ankle, bicep, elbow, wrist, inseam_ankle, inseam_floor, neck_waist, neck_floor,
      waist_floor, height, client_name, size_number, measurement_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      neck,                 // A
      shoulder_length,      // B
      arm_length,           // C
      across_front,         // D  
      chest_circumference,  // E
      waist,                // F
      hip_circumference,    // G
      total_rise,           // H
      thigh,                // I
      knee,                 // J
      calf,                 // K
      ankle,                // L
      bicep,                // M
      elbow,                // N
      wrist,                // O
      inseam_ankle,         // P
      inseam_floor,         // Q
      neck_waist,           // R
      neck_floor,           // S
      waist_floor,          // T
      height,               // U
      client_name,
      size_number,
      measurement_date
    ];

    db.run(sql, params, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    });
  });

  // PUT /api/measurements/male/:id - Update an existing male measurement
  measurementMaleRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const {
      neck,                 // A
      shoulder_length,      // B
      arm_length,           // C
      across_front,         // D  
      chest_circumference,  // E
      waist,                // F
      hip_circumference,    // G
      total_rise,           // H
      thigh,                // I
      knee,                 // J
      calf,                 // K
      ankle,                // L
      bicep,                // M
      elbow,                // N
      wrist,                // O
      inseam_ankle,         // P
      inseam_floor,         // Q
      neck_waist,           // R
      neck_floor,           // S
      waist_floor,          // T
      height,               // U
      client_name,
      size_number,
      measurement_date
    } = req.body;

    const sql = `UPDATE MaleMeasurement SET
      neck = ?, shoulder_length = ?, arm_length = ?, across_front = ?, chest_circumference = ?, waist = ?,
      hip_circumference = ?, total_rise = ?, thigh = ?, knee = ?, calf = ?, ankle = ?, bicep = ?, elbow = ?, wrist = ?, inseam_ankle = ?, inseam_floor = ?, neck_waist = ?, neck_floor = ?,
      waist_floor = ?, height = ?, client_name = ?, size_number = ?, measurement_date = ?
      WHERE id = ?`;

    const params = [
      neck,                 // A
      shoulder_length,      // B
      arm_length,           // C
      across_front,         // D  
      chest_circumference,  // E
      waist,                // F
      hip_circumference,    // G
      total_rise,           // H
      thigh,                // I
      knee,                 // J
      calf,                 // K
      ankle,                // L
      bicep,                // M
      elbow,                // N
      wrist,                // O
      inseam_ankle,         // P
      inseam_floor,         // Q
      neck_waist,           // R
      neck_floor,           // S
      waist_floor,          // T
      height,               // U
      client_name,
      size_number,
      measurement_date,
      id
    ];

    db.run(sql, params, function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Measurement not found' });
      } else {
        res.json({ message: 'Measurement updated successfully' });
      }
    });
  });

  // DELETE /api/measurements/male/:id - Delete a male measurement
  measurementMaleRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM MaleMeasurement WHERE id = ?', [id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Measurement not found' });
      } else {
        res.json({ message: 'Measurement deleted successfully' });
      }
    });
  });

  module.exports = measurementMaleRouter;
]

**CODE 2 - File: measurement-male-migration.js**  
[
  const sqlite3 = require('sqlite3');
  const path = require('path');

  // Use absolute path to avoid directory confusion
  const dbPath = path.resolve(__dirname, 'measurement-male-database.sqlite');
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    // Create table
    db.run(`CREATE TABLE IF NOT EXISTS MaleMeasurement (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      neck DECIMAL(5,2),                    -- A
      shoulder_length DECIMAL(5,2),         -- B
      arm_length DECIMAL(5,2),              -- C
      across_front DECIMAL(5,2),            -- D
      chest_circumference DECIMAL(5,2),     -- E
      waist DECIMAL(5,2),                   -- F
      hip_circumference DECIMAL(5,2),       -- G
      total_rise DECIMAL(5,2),              -- H
      thigh DECIMAL(5,2),                   -- I
      knee DECIMAL(5,2),                    -- J    
      calf DECIMAL(5,2),                    -- K 
      ankle DECIMAL(5,2),                   -- L  
      bicep DECIMAL(5,2),                   -- M
      elbow DECIMAL(5,2),                   -- N
      wrist DECIMAL(5,2),                   -- O
      inseam_ankle DECIMAL(5,2),            -- P
      inseam_floor DECIMAL(5,2),            -- Q
      neck_waist DECIMAL(5,2),              -- R
      neck_floor DECIMAL(5,2),              -- S
      waist_floor DECIMAL(5,2),             -- T
      height DECIMAL(5,2),                  -- U  
      client_name TEXT NOT NULL,            
      size_number TEXT,                       
      measurement_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('❌ Error creating MaleMeasurement table:', err.message);
      } else {
        console.log('✅ MaleMeasurement table ready.');
      }
    });

    // Create indexes
    ['client_name', 'measurement_date', 'size_number'].forEach(field => {
      db.run(`CREATE INDEX IF NOT EXISTS idx_malemeasurement_${field} ON MaleMeasurement(${field})`, (err) => {
        if (err) console.error(`❌ Index idx_malemeasurement_${field} failed:`, err.message);
        else console.log(`✅ Index idx_malemeasurement_${field} created.`);
      });
    });

    // Create trigger for auto-updating timestamp
    db.run(`CREATE TRIGGER IF NOT EXISTS update_malemeasurement_timestamp 
      AFTER UPDATE ON MaleMeasurement
      BEGIN
        UPDATE MaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END`, (err) => {
      if (err) console.error('❌ Trigger creation failed:', err.message);
      else console.log('✅ Trigger update_malemeasurement_timestamp created.');
    });
  });

  db.close((err) => {
    if (err) console.error('❌ Error closing database:', err.message);
    else console.log('🔒 Database connection closed.');
  });
] 

**CODE 3 - File: measurement-male-seed.js**  
[

]

**CODE 4 - File: measurement-male.test.js**  
[
  // =============================================================================
  // File: backend/test/measurement/male/measurement-male.test.js
  // HOW TO RUN:
  //   From the project root, go to backend directory and execute:
  //       npx mocha test/measurement/male/measurement-male.test.js --timeout 5000
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
      const apiRouter = require('../../../api');  // mounts measurement-male-routes
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
]

**CODE 5 - File: measurement-female.test**  
[
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
]

**CODE 6 - File: api.js**
[
  const express = require('express');
  const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes');
  const measurementFemaleRouter = require('./features/measurement/female/measurement-female-routes'); // <-- changed variable name

  const apiRouter = express.Router();

  apiRouter.use('/measurements/male', measurementMaleRouter);
  apiRouter.use('/measurements/female', measurementFemaleRouter);

  module.exports = apiRouter;
]

**CODE 7 - File: package.json**
[
    {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "scripts": {
      "test": "mocha test/**/*.test.js",
      "test:female": "mocha test/measurement/female/measurement-female.test.js --timeout 5000"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "body-parser": "^2.2.2",
      "cors": "^2.8.6",
      "errorhandler": "^1.5.2",
      "express": "^5.2.1",
      "morgan": "^1.10.1",
      "random-flat-colors": "^1.0.4",
      "react": "^15.6.1",
      "react-dom": "^15.6.1",
      "react-router-dom": "^4.2.2",
      "sqlite3": "^5.1.7",
      "whatwg-fetch": "^2.0.3"
    },
    "devDependencies": {
      "babel": "^6.23.0",
      "babel-core": "^6.26.0",
      "babel-loader": "^7.1.2",
      "babel-preset-es2015": "^6.24.1",
      "babel-preset-react": "^6.24.1",
      "babel-preset-stage-2": "^6.24.1",
      "chai": "^6.2.2",
      "chai-http": "^5.1.2",
      "mocha": "^11.7.5",
      "supertest": "^7.2.2",
      "webpack": "^3.5.5"
    }
  }

]

**CODE 8 - File: README.md**
[
  Izzy-Alteration
  ├─ Package-list.md
  ├─ backend
  │  ├─ api.js
  │  ├─ backend-deepseek-prompt
  │  │  ├─ create-test-on-route.md
  │  │  ├─ debugging-backend.md
  │  │  ├─ features-measurement-routes-migration.md
  │  │  ├─ measurement-female.md
  │  │  └─ measurement-male-routes-migration-test.md
  │  ├─ features
  │  │  └─ measurement
  │  │     ├─ Instruction(migration script).md
  │  │     ├─ female
  │  │     │  ├─ measurement-female-database.sqlite
  │  │     │  ├─ measurement-female-migration.js
  │  │     │  ├─ measurement-female-routes.js
  │  │     │  └─ measurement-female-seeding.js
  │  │     └─ male
  │  │        ├─ measurement-male-database.sqlite
  │  │        ├─ measurement-male-migration.js
  │  │        └─ measurement-male-routes.js
  │  ├─ package-lock.json
  │  ├─ package.json
  │  ├─ server.js
  │  └─ test
  │     └─ measurement
  │        ├─ Instruction(measurement-male-test).md
  │        ├─ female
  │        │  └─ measurement-female.test.js
  │        └─ male
  │           ├─ measurement-male-seed.js
  │           ├─ measurement-male-test.sqlite
  │           └─ measurement-male.test.js
  ├─ frontend
  │  ├─ package-lock.json
  │  ├─ package.json
  │  ├─ pages
  │  │  ├─ account-menu.html
  │  │  ├─ add-service.html
  │  │  ├─ alteration-pages
  │  │  │  ├─ alteration-about
  │  │  │  │  ├─ (debug)alteration-modules.md
  │  │  │  │  ├─ alteration(how-the-program-works).md
  │  │  │  │  ├─ alteration-female.txt
  │  │  │  │  ├─ alteration-functionality-prompt.md
  │  │  │  │  ├─ alteration-modules.md
  │  │  │  │  └─ alteration-responsive-page.md
  │  │  │  ├─ alteration-female-bottom.html
  │  │  │  ├─ alteration-female-dress.html
  │  │  │  ├─ alteration-female-jacket.html
  │  │  │  ├─ alteration-female-top.html
  │  │  │  ├─ alteration-male-bottom.html
  │  │  │  ├─ alteration-male-suits.html
  │  │  │  ├─ alteration-male-top.html
  │  │  │  ├─ alteration-modules
  │  │  │  │  ├─ alteration-CartManager.js
  │  │  │  │  ├─ alteration-DOMRenderer.js
  │  │  │  │  ├─ alteration-DataMaps.js
  │  │  │  │  ├─ alteration-EventManager.js
  │  │  │  │  ├─ alteration-Main.js
  │  │  │  │  ├─ alteration-PriceCalculator.js
  │  │  │  │  └─ alteration-StateManager.js
  │  │  │  └─ alteration-repair.html
  │  │  ├─ index.html
  │  │  ├─ login.html
  │  │  ├─ measurement-pages
  │  │  │  ├─ measurement-about
  │  │  │  │  ├─ (debug)floating-window-measurement.md
  │  │  │  │  ├─ (debug)measurement-split-modules.md
  │  │  │  │  ├─ (refactor)measurement-modules.md
  │  │  │  │  ├─ measurement(how-the-program-works).md
  │  │  │  │  ├─ measurement-functionality-prompt.md
  │  │  │  │  ├─ measurement-modules.md
  │  │  │  │  └─ measurements-about.txt
  │  │  │  ├─ measurement-modules
  │  │  │  │  ├─ measurement-DataMaps.js
  │  │  │  │  ├─ measurement-Main.js
  │  │  │  │  ├─ measurement-Manager.js
  │  │  │  │  ├─ measurement-Validator.js
  │  │  │  │  └─ measurement-ViewHandler.js
  │  │  │  ├─ measurements-female.html
  │  │  │  ├─ measurements-male.html
  │  │  │  └─ sample.html
  │  │  ├─ order-history.html
  │  │  ├─ services.html
  │  │  └─ signup.html
  │  ├─ public
  │  │  ├─ css
  │  │  │  ├─ account-menu.css
  │  │  │  ├─ add-service.css
  │  │  │  ├─ alteration-female.css
  │  │  │  ├─ alteration.css
  │  │  │  ├─ index.css
  │  │  │  ├─ login.css
  │  │  │  ├─ measurements.css
  │  │  │  ├─ order-history.css
  │  │  │  ├─ services.css
  │  │  │  └─ signup.css
  │  │  ├─ images
  │  │  │  ├─ female-(chart)-tablet-mobile.png
  │  │  │  ├─ female-back-tablet-mobile.png
  │  │  │  ├─ female-desktop.png
  │  │  │  ├─ female-front-tablet-mobile.png
  │  │  │  ├─ male-(chart)-tablet-mobile.png
  │  │  │  ├─ male-back-tablet-mobile.png
  │  │  │  ├─ male-desktop.png
  │  │  │  └─ male-front-tablet-mobile.png
  │  │  └─ js
  │  │     ├─ account.js
  │  │     ├─ add-service.js
  │  │     ├─ alteration-female.js
  │  │     ├─ alteration-price-calculator.js
  │  │     ├─ index.js
  │  │     ├─ login.js
  │  │     ├─ order-history.js
  │  │     ├─ services.js
  │  │     └─ signup.js
  │  └─ test
  │     ├─ TEST(how to run).md
  │     ├─ alteration-module-tests
  │     │  ├─ alteration-TEST(about)
  │     │  │  ├─ (debug)alteration-test-unit.md
  │     │  │  ├─ (refactor)alteration-test-unit.md
  │     │  │  └─ alteration-unit-tests-prompt.md
  │     │  └─ unit
  │     │     ├─ alteration-CartManager.test.js
  │     │     ├─ alteration-DOMRenderer.test.js
  │     │     ├─ alteration-DataMaps.test.js
  │     │     ├─ alteration-EventManager.test.js
  │     │     ├─ alteration-Main.test.js
  │     │     ├─ alteration-PriceCalculator.test.js
  │     │     └─ alteration-StateManager.test.js
  │     └─ measurement-module-tests
  │        ├─ measurement-TEST(about)
  │        │  ├─ (debug)measurement-test-unit.md
  │        │  ├─ (refactor)measurement-test-unit.md
  │        │  └─ measurement-unit-tests-prompt.md
  │        └─ unit
  │           ├─ measurement-DataMaps.test.js
  │           ├─ measurement-Main.test.js
  │           ├─ measurement-Manager.test.js
  │           ├─ measurement-Validator.test.js
  │           └─ measurement-ViewHandler.test.js
  ├─ package-lock.json
└─ package.json

]



**ERROR/ISSUE:**
[
  none
]

**REQUEST:**
[
  1. create mocha test cases for measurement-male-routes.js and measurement-male-migration.js, then combine them into a single file named measurement-male.test.js
  2. implement the test cases to cover all CRUD operations in measurement-male-routes.js and ensure the database schema is correctly set up by measurement-male-migration.js
  3. add supertest to test the API endpoints defined in measurement-male-routes.js  
  4. ensure that the test cases are comprehensive and cover edge cases, such as invalid input and non-existent records
  5. implement the measurement-male.test.js with similar style to the **CODE 5 - File: measurement-female.test** , ensuring consistency in testing style and structure
  6. add instruction on how to run the tests
  7. create a script that will run the tests using this command: 
]