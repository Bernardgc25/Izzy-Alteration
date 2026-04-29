**CODE 1 - File: measurement-female-routes.js**  
[
  const express = require('express');
  const sqlite3 = require('sqlite3');
  const db = new sqlite3.Database(process.env.TEST_DATABASE || './measurement-female-database.sqlite');

  const measurementFemaleRouter = express.Router();

  // GET /api/measurements/female - Get all female measurements
  measurementFemaleRouter.get('/', (req, res) => {
    db.all('SELECT * FROM FemaleMeasurement', (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
  });

  // GET /api/measurements/female/:id - Get a specific female measurement by ID
  measurementFemaleRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM FemaleMeasurement WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: 'Measurement not found' });
      }
    });
  });

  // POST /api/measurements/female - Create a new female measurement
  measurementFemaleRouter.post('/', (req, res) => {
    const {
      neck,                   // A
      shoulder_length,        // B
      arm_length,             // C
      chest_circumference,    // D
      under_bust,             // E
      waist,                  // F
      hipbone_circumference,  // G    
      hip_circumference,      // H
      thigh,                  // I
      knee,                   // J    
      calf,                   // K
      ankle,                  // L
      bicep,                  // M
      elbow,                  // N
      wrist,                  // O
      inseam_ankle,           // P
      inseam_floor,           // Q
      neck_waist,             // R
      neck_floor,             // S    
      waist_floor,            // T
      height,                 // U
      client_name,
      size_number,
      measurement_date
    } = req.body;

    const sql = `INSERT INTO FemaleMeasurement (
      neck, shoulder_length, arm_length, chest_circumference, under_bust, waist, hipbone_circumference, hip_circumference,
      thigh, knee, calf, ankle, bicep, elbow, wrist, inseam_ankle, inseam_floor, neck_waist, neck_floor,
      waist_floor, height, client_name, size_number, measurement_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      neck,                   // A
      shoulder_length,        // B
      arm_length,             // C
      chest_circumference,    // D
      under_bust,             // E
      waist,                  // F
      hipbone_circumference,  // G    
      hip_circumference,      // H
      thigh,                  // I
      knee,                   // J    
      calf,                   // K
      ankle,                  // L
      bicep,                  // M
      elbow,                  // N
      wrist,                  // O
      inseam_ankle,           // P
      inseam_floor,           // Q
      neck_waist,             // R
      neck_floor,             // S    
      waist_floor,            // T
      height,                 // U
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

  // PUT /api/measurements/female/:id - Update an existing female measurement
  measurementFemaleRouter.put('/:id', (req, res) => {
    const id = req.params.id;
    const {
      neck,                   // A
      shoulder_length,        // B
      arm_length,             // C
      chest_circumference,    // D
      under_bust,             // E
      waist,                  // F
      hipbone_circumference,  // G    
      hip_circumference,      // H
      thigh,                  // I
      knee,                   // J    
      calf,                   // K
      ankle,                  // L
      bicep,                  // M
      elbow,                  // N
      wrist,                  // O
      inseam_ankle,           // P
      inseam_floor,           // Q
      neck_waist,             // R
      neck_floor,             // S    
      waist_floor,            // T
      height,                 // U
      client_name,
      size_number,
      measurement_date
    } = req.body;

    const sql = `UPDATE FemaleMeasurement SET
      neck = ?, shoulder_length = ?, arm_length = ?, chest_circumference = ?, under_bust = ?, waist = ?,
      hipbone_circumference = ?, hip_circumference = ?, thigh = ?, knee = ?, calf = ?, ankle = ?, bicep = ?, elbow = ?, wrist = ?, inseam_ankle = ?, inseam_floor = ?, neck_waist = ?, neck_floor = ?,
      waist_floor = ?, height = ?, client_name = ?, size_number = ?, measurement_date = ?
      WHERE id = ?`;

    const params = [
      neck,                   // A
      shoulder_length,        // B
      arm_length,             // C
      chest_circumference,    // D
      under_bust,             // E
      waist,                  // F
      hipbone_circumference,  // G    
      hip_circumference,      // H
      thigh,                  // I
      knee,                   // J    
      calf,                   // K
      ankle,                  // L
      bicep,                  // M
      elbow,                  // N
      wrist,                  // O
      inseam_ankle,           // P
      inseam_floor,           // Q
      neck_waist,             // R
      neck_floor,             // S    
      waist_floor,            // T
      height,                 // U
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

  // DELETE /api/measurements/female/:id - Delete a female measurement
  measurementFemaleRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM FemaleMeasurement WHERE id = ?', [id], function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Measurement not found' });
      } else {
        res.json({ message: 'Measurement deleted successfully' });
      }
    });
  });

  module.exports = measurementFemaleRouter;
]

**CODE 2 - File: measurement-female-migration.js**  
[
  const sqlite3 = require('sqlite3');
  const path = require('path');

  // Use absolute path to avoid directory confusion
  const dbPath = path.resolve(__dirname, 'measurement-female-database.sqlite');
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    // Create table
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
    )`, (err) => {
      if (err) console.error('❌ Error creating FemaleMeasurement table:', err.message);
      else console.log('✅ FemaleMeasurement table ready.');
    });

    // Create indexes
    ['client_name', 'measurement_date', 'size_number'].forEach(field => {
      db.run(`CREATE INDEX IF NOT EXISTS idx_femalemeasurement_${field}
              ON FemaleMeasurement(${field})`, (err) => {
        if (err) console.error(`❌ Index idx_femalemeasurement_${field} failed:`, err.message);
        else console.log(`✅ Index idx_femalemeasurement_${field} created.`);
      });
    });

    // Create trigger – fixed: added semicolon after END and proper FOR EACH ROW (optional)
    db.run(`CREATE TRIGGER IF NOT EXISTS update_femalemeasurement_timestamp 
      AFTER UPDATE ON FemaleMeasurement
      FOR EACH ROW
      BEGIN
        UPDATE FemaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END;`, (err) => {
      if (err) console.error('❌ Trigger creation failed:', err.message);
      else console.log('✅ Trigger update_femalemeasurement_timestamp created.');
    });
  });

  // Wait for all statements to finish before closing
  db.close((err) => {
    if (err) console.error('❌ Error closing database:', err.message);
    else console.log('🔒 Database connection closed.');
  });
] 

**CODE 3 - File: api.js**
[
  const express = require('express');
  const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes');
  const measurementFemaleRouter = require('./features/measurement/female/measurement-female-routes'); // <-- changed variable name

  const apiRouter = express.Router();

  apiRouter.use('/measurements/male', measurementMaleRouter);
  apiRouter.use('/measurements/female', measurementFemaleRouter);

  module.exports = apiRouter;
]

**CODE 4 - File: package.json**
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

**CODE 5 - File: README.md**
[
  Izzy-Alteration
  ├─ backend
  │  ├─ api.js
  │  ├─ backend-deepseek-prompt
  │  │  ├─ create-test-on-route.md
  │  │  ├─ debugging-backend.md
  │  │  ├─ features-measurement-routes-migration.md
  │  │  ├─ measurement-female-routes-migration-test.md
  │  │  └─ measurement-male-routes-migration-test.md
  │  ├─ features
  │  │  └─ measurement
  │  │     ├─ Instruction(migration script).md
  │  │     ├─ female
  │  │     │  ├─ measurement-female-database.sqlite
  │  │     │  ├─ measurement-female-migration.js
  │  │     │  └─ measurement-female-routes.js
  │  │     └─ male
  │  │        ├─ measurement-male-database.sqlite
  │  │        ├─ measurement-male-migration.js
  │  │        └─ measurement-male-routes.js
  │  ├─ measurement-female-database.sqlite
  │  ├─ measurement-male-database.sqlite
  │  ├─ package-lock.json
  │  ├─ package.json
  │  ├─ server.js
  │  └─ test
  │     └─ measurement
  │        ├─ Instruction(measurement-male-test).md
  │        ├─ female
  │        │  ├─ Instruction(measurement-female-test).md
  │        │  ├─ measurement-female-seed-test.sqlite
  │        │  ├─ measurement-female-seed.js
  │        │  └─ measurement-female.test.js
  │        └─ male
  │           ├─ measurement-male-seed.js
  │           ├─ measurement-male-test.sqlite
  │           └─ measurement-male.test.js
  └─ frontend
    ├─ package-lock.json
    ├─ package.json
    ├─ pages
    │  ├─ account-menu.html
    │  ├─ add-service.html
    │  ├─ alteration-pages
    │  │  ├─ alteration-about
    │  │  │  ├─ (debug)alteration-modules.md
    │  │  │  ├─ alteration(how-the-program-works).md
    │  │  │  ├─ alteration-female.txt
    │  │  │  ├─ alteration-functionality-prompt.md
    │  │  │  ├─ alteration-modules.md
    │  │  │  └─ alteration-responsive-page.md
    │  │  ├─ alteration-female-bottom.html
    │  │  ├─ alteration-female-dress.html
    │  │  ├─ alteration-female-jacket.html
    │  │  ├─ alteration-female-top.html
    │  │  ├─ alteration-male-bottom.html
    │  │  ├─ alteration-male-suits.html
    │  │  ├─ alteration-male-top.html
    │  │  ├─ alteration-modules
    │  │  │  ├─ alteration-CartManager.js
    │  │  │  ├─ alteration-DOMRenderer.js
    │  │  │  ├─ alteration-DataMaps.js
    │  │  │  ├─ alteration-EventManager.js
    │  │  │  ├─ alteration-Main.js
    │  │  │  ├─ alteration-PriceCalculator.js
    │  │  │  └─ alteration-StateManager.js
    │  │  └─ alteration-repair.html
    │  ├─ index.html
    │  ├─ login.html
    │  ├─ measurement-pages
    │  │  ├─ measurement-about
    │  │  │  ├─ (debug)floating-window-measurement.md
    │  │  │  ├─ (debug)measurement-split-modules.md
    │  │  │  ├─ (refactor)measurement-modules.md
    │  │  │  ├─ measurement(how-the-program-works).md
    │  │  │  ├─ measurement-functionality-prompt.md
    │  │  │  ├─ measurement-modules.md
    │  │  │  └─ measurements-about.txt
    │  │  ├─ measurement-modules
    │  │  │  ├─ measurement-DataMaps.js
    │  │  │  ├─ measurement-Main.js
    │  │  │  ├─ measurement-Manager.js
    │  │  │  ├─ measurement-Validator.js
    │  │  │  └─ measurement-ViewHandler.js
    │  │  ├─ measurements-female.html
    │  │  ├─ measurements-male.html
    │  │  └─ sample.html
    │  ├─ order-history.html
    │  ├─ services.html
    │  └─ signup.html
    ├─ public
    │  ├─ css
    │  │  ├─ account-menu.css
    │  │  ├─ add-service.css
    │  │  ├─ alteration-female.css
    │  │  ├─ alteration.css
    │  │  ├─ index.css
    │  │  ├─ login.css
    │  │  ├─ measurements.css
    │  │  ├─ order-history.css
    │  │  ├─ services.css
    │  │  └─ signup.css
    │  ├─ images
    │  │  ├─ female-(chart)-tablet-mobile.png
    │  │  ├─ female-back-tablet-mobile.png
    │  │  ├─ female-desktop.png
    │  │  ├─ female-front-tablet-mobile.png
    │  │  ├─ male-(chart)-tablet-mobile.png
    │  │  ├─ male-back-tablet-mobile.png
    │  │  ├─ male-desktop.png
    │  │  └─ male-front-tablet-mobile.png
    │  └─ js
    │     ├─ account.js
    │     ├─ add-service.js
    │     ├─ alteration-female.js
    │     ├─ alteration-price-calculator.js
    │     ├─ index.js
    │     ├─ login.js
    │     ├─ order-history.js
    │     ├─ services.js
    │     └─ signup.js
    └─ test
        ├─ TEST(how to run).md
        ├─ alteration-module-tests
        │  ├─ alteration-TEST(about)
        │  │  ├─ (debug)alteration-test-unit.md
        │  │  ├─ (refactor)alteration-test-unit.md
        │  │  └─ alteration-unit-tests-prompt.md
        │  └─ unit
        │     ├─ alteration-CartManager.test.js
        │     ├─ alteration-DOMRenderer.test.js
        │     ├─ alteration-DataMaps.test.js
        │     ├─ alteration-EventManager.test.js
        │     ├─ alteration-Main.test.js
        │     ├─ alteration-PriceCalculator.test.js
        │     └─ alteration-StateManager.test.js
        └─ measurement-module-tests
          ├─ measurement-TEST(about)
          │  ├─ (debug)measurement-test-unit.md
          │  ├─ (refactor)measurement-test-unit.md
          │  └─ measurement-unit-tests-prompt.md
          └─ unit
              ├─ measurement-DataMaps.test.js
              ├─ measurement-Main.test.js
              ├─ measurement-Manager.test.js
              ├─ measurement-Validator.test.js
              └─ measurement-ViewHandler.test.js

]

**CODE 6 - File: measurement-female.test.js**
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

**CODE 7 - File: measurement-female-seed.js**
[
  // =============================================================================
  // measurement-female-seed.js
  // =============================================================================
  // Seeds the test database (measurement-female-test.sqlite) with sample data.
  // Every time this script is run it inserts new records – it does NOT check
  // whether the table already contains data, so repeated runs will add more rows.
  //
  // HOW TO RUN:
  //  1. From the project root, go to backend directory and execute:
  //       node test/measurement/female/measurement-female-seed.js
  //  2. go to DB Browser and open the measurement-female-seed-test.sqlite file to verify the inserted data.
  // =============================================================================

  const sqlite3 = require('sqlite3');
  const path = require('path');

  const dbPath = path.join(__dirname, 'measurement-female-seed-test.sqlite');
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    // Ensure the table exists
    db.run(`
      CREATE TABLE IF NOT EXISTS FemaleMeasurement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        neck DECIMAL(5,2),                            -- A
        shoulder_length DECIMAL(5,2),                 -- B
        arm_length DECIMAL(5,2),                      -- C
        chest_circumference DECIMAL(5,2),             -- D
        under_bust DECIMAL(5,2),                      -- E
        waist DECIMAL(5,2),                           -- F
        hipbone_circumference DECIMAL(5,2),           -- G
        hip_circumference DECIMAL(5,2),               -- H
        thigh DECIMAL(5,2),                           -- I
        knee DECIMAL(5,2),                            -- J
        calf DECIMAL(5,2),                            -- K
        ankle DECIMAL(5,2),                           -- L
        bicep DECIMAL(5,2),                           -- M
        elbow DECIMAL(5,2),                           -- N
        wrist DECIMAL(5,2),                           -- O
        inseam_ankle DECIMAL(5,2),                    -- P
        inseam_floor DECIMAL(5,2),                    -- Q
        neck_waist DECIMAL(5,2),                      -- R
        neck_floor DECIMAL(5,2),                      -- S      
        waist_floor DECIMAL(5,2),                     -- T
        height DECIMAL(5,2),                          -- U
        client_name TEXT NOT NULL,
        size_number TEXT,
        measurement_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sample female measurement data – inserted on every run
    const sampleData = [
      {
        neck: 32.5, shoulder_length: 38.0, arm_length: 58.0, chest_circumference: 86.0,
        under_bust: 74.0, waist: 68.0, hipbone_circumference: 88.0, hip_circumference: 94.0,
        thigh: 54.0, knee: 34.0, calf: 32.0, ankle: 21.0, bicep: 28.0, elbow: 24.0,
        wrist: 15.5, inseam_ankle: 70.0, inseam_floor: 98.0, neck_waist: 42.0,
        neck_floor: 135.0, waist_floor: 102.0, height: 162.0, client_name: 'Emma Johnson',
        size_number: 'S', measurement_date: '2025-01-15'
      },
      {
        neck: 34.0, shoulder_length: 40.0, arm_length: 60.0, chest_circumference: 92.0,
        under_bust: 80.0, waist: 74.0, hipbone_circumference: 94.0, hip_circumference: 100.0,
        thigh: 58.0, knee: 36.0, calf: 34.0, ankle: 22.0, bicep: 30.0, elbow: 26.0,
        wrist: 16.0, inseam_ankle: 72.0, inseam_floor: 100.0, neck_waist: 44.0,
        neck_floor: 140.0, waist_floor: 105.0, height: 168.0, client_name: 'Sophia Martinez',
        size_number: 'M', measurement_date: '2025-02-20'
      },
      {
        neck: 36.0, shoulder_length: 42.0, arm_length: 62.0, chest_circumference: 98.0,
        under_bust: 86.0, waist: 80.0, hipbone_circumference: 100.0, hip_circumference: 106.0,
        thigh: 62.0, knee: 38.0, calf: 36.0, ankle: 23.0, bicep: 32.0, elbow: 28.0,
        wrist: 17.0, inseam_ankle: 74.0, inseam_floor: 103.0, neck_waist: 46.0,
        neck_floor: 145.0, waist_floor: 108.0, height: 172.0, client_name: 'Olivia Williams',
        size_number: 'L', measurement_date: '2025-03-10'
      },
      {
        neck: 37.5, shoulder_length: 44.0, arm_length: 64.0, chest_circumference: 104.0,
        under_bust: 92.0, waist: 86.0, hipbone_circumference: 106.0, hip_circumference: 112.0,
        thigh: 66.0, knee: 40.0, calf: 38.0, ankle: 24.0, bicep: 34.0, elbow: 30.0,
        wrist: 18.0, inseam_ankle: 76.0, inseam_floor: 106.0, neck_waist: 48.0,
        neck_floor: 150.0, waist_floor: 112.0, height: 178.0, client_name: 'Ava Brown',
        size_number: 'XL', measurement_date: '2025-04-05'
      },
      {
        neck: 33.0, shoulder_length: 39.0, arm_length: 59.0, chest_circumference: 89.0,
        under_bust: 77.0, waist: 71.0, hipbone_circumference: 91.0, hip_circumference: 97.0,
        thigh: 56.0, knee: 35.0, calf: 33.0, ankle: 21.5, bicep: 29.0, elbow: 25.0,
        wrist: 15.5, inseam_ankle: 71.0, inseam_floor: 99.0, neck_waist: 43.0,
        neck_floor: 138.0, waist_floor: 104.0, height: 165.0, client_name: 'Isabella Garcia',
        size_number: 'M', measurement_date: '2025-05-22'
      }
    ];

    const stmt = db.prepare(`
      INSERT INTO FemaleMeasurement (
        neck, shoulder_length, arm_length, chest_circumference, under_bust, waist,
        hipbone_circumference, hip_circumference, thigh, knee, calf, ankle, bicep,
        elbow, wrist, inseam_ankle, inseam_floor, neck_waist, neck_floor, waist_floor,
        height, client_name, size_number, measurement_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const record of sampleData) {
      stmt.run(
        record.neck, record.shoulder_length, record.arm_length, record.chest_circumference,
        record.under_bust, record.waist, record.hipbone_circumference, record.hip_circumference,
        record.thigh, record.knee, record.calf, record.ankle, record.bicep, record.elbow,
        record.wrist, record.inseam_ankle, record.inseam_floor, record.neck_waist,
        record.neck_floor, record.waist_floor, record.height, record.client_name,
        record.size_number, record.measurement_date
      );
    }

    stmt.finalize((err) => {
      if (err) {
        console.error('❌ Error inserting seed data:', err.message);
      } else {
        console.log(`✅ ${sampleData.length} female measurement records seeded successfully.`);
      }
      db.close();
    });
  });
]


**ERROR/ISSUE:**
[
  none
]

**REQUEST:**
[
  1. create a filename:measurement-female-seed.js that will reference the table: FemaleMeasurement from filename: measurement-female-migration.js
  2. the (measurement-female-seed.js) will populate the database:(measurement-female-test.sqlite) with sample data.
  3. create a condition that if the user manually deleted the data in database:(measurement-female-test.sqlite), then (id INTEGER PRIMARY KEY AUTOINCREMENT) will restart to 0
  4. add instruction how to run it 
]