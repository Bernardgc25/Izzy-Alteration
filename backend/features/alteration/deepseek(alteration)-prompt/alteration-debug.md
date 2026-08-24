**CODE 1 - File:{README.md}**  
[
 Izzy-Alteration
├─ Package-list.md
├─ backend
│  ├─ api.js
│  ├─ backend-deepseek-prompt
│  │  ├─ features-measurement-routes-migration.md
│  │  ├─ measurement-API-postman-test.md
│  │  ├─ measurement-male-routes-migration-test.md
│  │  └─ measurement-unit-test.md
│  ├─ features
│  │  ├─ alteration
│  │  │  ├─ alteration-database.sqlite
│  │  │  ├─ alteration-migration.js
│  │  │  ├─ alteration-routes.js
│  │  │  ├─ alteration-seeding.js
│  │  │  ├─ deepseek(alteration)-prompt
│  │  │  │  ├─ alteration-CRUD.md
│  │  │  │  └─ alteration-debug.md
│  │  │  └─ instruction
│  │  │     └─ alteration-test-instruction.md
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
│  │        ├─ measurement-male-routes.js
│  │        └─ measurement-male-seeding.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postman
│  │  ├─ alteration-API-test
│  │  │  └─ alteration-crud-tests.postman_collection.json
│  │  └─ measurment-API-test
│  │     ├─ female-measurements-crud-tests.postman_collection.json
│  │     └─ male-measurements-crud-tests.postman_collection.json
│  ├─ server.js
│  └─ test
│     ├─ alteration
│     │  └─ alteration.test.js
│     └─ measurement
│        ├─ Instruction-measurement-test.md
│        ├─ measurement-female.test.js
│        └─ measurement-male.test.js
├─ deepseek-template-prompt(utilize this)
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

**CODE 2 - File:{alteration-routes.js}**  
[
const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = process.env.TEST_DATABASE_ALTERATION ||
  path.resolve(__dirname, 'alteration-database.sqlite');

const db = new sqlite3.Database(dbPath);
const alterationRouter = express.Router();

const requiredFields = [
  'category',
  'service_key',
  'label',
  'simple_price',
  'intermediate_price',
  'difficult_price'
];

function validateAlteration(body) {
  const errors = [];

  requiredFields.forEach(field => {
    const value = body[field];
    if (value === undefined || value === null || value === '') {
      errors.push(`${field} is required`);
    }
  });

  ['simple_price', 'intermediate_price', 'difficult_price'].forEach(field => {
    const value = body[field];
    if (value !== undefined && value !== '' && isNaN(Number(value))) {
      errors.push(`${field} must be a number`);
    }
  });

  return errors;
}

// GET /api/alterations
// Optional query params:
//   category=female-dress
//   service_key=female-top-hem-unlined
//   search=hem
alterationRouter.get('/', (req, res) => {
  const { category, service_key, search } = req.query;

  let sql = 'SELECT * FROM AlterationItem';
  const params = [];
  const conditions = [];

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  if (service_key) {
    conditions.push('service_key = ?');
    params.push(service_key);
  }

  if (search) {
    conditions.push('(service_key LIKE ? OR label LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY id';

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/alterations/map
// Returns nested map matching the frontend alteration-DataMaps.js shape:
// {
//   "female-bottom": {
//     "female-bottom-hem-skirt-straight-slim": {
//       simple: 33,
//       intermediate: 44,
//       difficult: 55,
//       detail: "..."
//     }
//   }
// }
alterationRouter.get('/map', (req, res) => {
  db.all('SELECT * FROM AlterationItem ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const grouped = {};

    rows.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = {};
      }

      grouped[item.category][item.service_key] = {
        simple: item.simple_price,
        intermediate: item.intermediate_price,
        difficult: item.difficult_price,
        detail: item.description
      };
    });

    res.json(grouped);
  });
});

// GET /api/alterations/category/:category
alterationRouter.get('/category/:category', (req, res) => {
  const category = req.params.category;

  db.all(
    'SELECT * FROM AlterationItem WHERE category = ? ORDER BY id',
    [category],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// GET /api/alterations/:id
alterationRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid alteration id' });
  }

  db.get('SELECT * FROM AlterationItem WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Alteration not found' });
    res.json(row);
  });
});

// POST /api/alterations
alterationRouter.post('/', (req, res) => {
  const errors = validateAlteration(req.body);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const {
    category,
    service_key,
    label,
    description = '',
    simple_price,
    intermediate_price,
    difficult_price
  } = req.body;

  const sql = `
    INSERT INTO AlterationItem (
      category,
      service_key,
      label,
      description,
      simple_price,
      intermediate_price,
      difficult_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    category,
    service_key,
    label,
    description,
    Number(simple_price),
    Number(intermediate_price),
    Number(difficult_price)
  ];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'service_key already exists' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ id: this.lastID });
  });
});

// PUT /api/alterations/:id
alterationRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid alteration id' });
  }

  const errors = validateAlteration(req.body);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const {
    category,
    service_key,
    label,
    description = '',
    simple_price,
    intermediate_price,
    difficult_price
  } = req.body;

  const sql = `
    UPDATE AlterationItem
    SET category = ?,
        service_key = ?,
        label = ?,
        description = ?,
        simple_price = ?,
        intermediate_price = ?,
        difficult_price = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const params = [
    category,
    service_key,
    label,
    description,
    Number(simple_price),
    Number(intermediate_price),
    Number(difficult_price),
    id
  ];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'service_key already exists' });
      }
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Alteration not found' });
    }

    res.json({ message: 'Alteration updated successfully' });
  });
});

// DELETE /api/alterations/:id
alterationRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid alteration id' });
  }

  db.run('DELETE FROM AlterationItem WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Alteration not found' });
    }

    res.json({ message: 'Alteration deleted successfully' });
  });
});

module.exports = alterationRouter;
]

**CODE 3 - File:{alteration-migration.js}**  
[
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'alteration-database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS AlterationItem (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      service_key TEXT NOT NULL UNIQUE,
      label TEXT NOT NULL,
      description TEXT,
      simple_price REAL NOT NULL DEFAULT 0,
      intermediate_price REAL NOT NULL DEFAULT 0,
      difficult_price REAL NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('❌ Error creating AlterationItem table:', err.message);
    else console.log('✅ AlterationItem table ready.');
  });

  ['category', 'service_key'].forEach(field => {
    db.run(
      `CREATE INDEX IF NOT EXISTS idx_alterationitem_${field} ON AlterationItem(${field})`,
      (err) => {
        if (err) console.error(`❌ Index idx_alterationitem_${field} failed:`, err.message);
        else console.log(`✅ Index idx_alterationitem_${field} created.`);
      }
    );
  });

  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_alterationitem_timestamp
    AFTER UPDATE ON AlterationItem
    BEGIN
      UPDATE AlterationItem
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = NEW.id;
    END
  `, (err) => {
    if (err) console.error('❌ Trigger creation failed:', err.message);
    else console.log('✅ Trigger update_alterationitem_timestamp created.');
  });
});

db.close((err) => {
  if (err) console.error('❌ Error closing database:', err.message);
  else console.log('🔒 Database connection closed.');
});
]

**CODE 4 - File:{measurement-male.test.js}**  
[
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
  let originalTestDatabase; // Store original TEST_DATABASE value

  before(async function () {
    // Store original TEST_DATABASE value if it exists
    originalTestDatabase = process.env.TEST_DATABASE;
    
    // 1. Create a fresh test database file
    if (fs.existsSync(TEST_DB_FILE)) fs.unlinkSync(TEST_DB_FILE);

    // 2. Run migration on it
    const migrationDb = new sqlite3.Database(TEST_DB_FILE);
    await runMigration(migrationDb);

    // 3. Set environment so that the routes module uses this database
    process.env.TEST_DATABASE = TEST_DB_FILE;

    // 4. Clear the require cache for api and route modules to ensure fresh connections
    delete require.cache[require.resolve('../../api')];
    delete require.cache[require.resolve('../../features/measurement/male/measurement-male-routes')];

    // 5. Build Express app with the actual API router
    const apiRouter = require('../../api');  // mounts measurement-male-routes
    const expressApp = express();
    expressApp.use(express.json());
    expressApp.use('/api', apiRouter);
    app = expressApp;

    // 6. Open a separate connection for schema validation
    testDb = new sqlite3.Database(TEST_DB_FILE);
  });

  after(async function () {
    // Close validation connection and remove test database file
    if (testDb) await new Promise(resolve => testDb.close(resolve));
    if (fs.existsSync(TEST_DB_FILE)) fs.unlinkSync(TEST_DB_FILE);
    
    // Restore original TEST_DATABASE or delete if it didn't exist
    if (originalTestDatabase !== undefined) {
      process.env.TEST_DATABASE = originalTestDatabase;
    } else {
      delete process.env.TEST_DATABASE;
    }
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

**CODE 5 - File:{package.json}**  
[
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "migrate:alteration": "node features/alteration/alteration-migration.js",
    "seed:alteration": "node features/alteration/alteration-seeding.js",
    "test:measurements": "mocha test/measurement/measurement-female.test.js test/measurement/measurement-male.test.js --timeout 5000",
    "test:female": "mocha test/measurement/measurement-female.test.js --timeout 5000",
    "test:male": "mocha test/measurement/measurement-male.test.js --timeout 5000",
    "test:alteration": "mocha test/alteration/alteration.test.js --timeout 5000"
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
    "chai": "^4.4.1",
    "chai-http": "^4.4.0",
    "mocha": "^11.7.5",
    "supertest": "^7.2.2",
    "webpack": "^3.5.5"
  }
}

]

**CODE 6 - File:{filename}**
[

]

**CODE 7 - File:{filename}**
[
   

]

**CODE 8 - File:{filename}**
[
 
]



**ERROR/ISSUE:**
[

]

**REQUEST:**
[
1. create a combine mocha test unit for CODE 2 and CODE 3.
2. provide instruction on how to use it. 
3. update necessary files.
4. utilize the same structure in CODE 4 and make it as a reference. 

]