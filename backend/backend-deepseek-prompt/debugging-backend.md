**CODE 1 - File: measurement-male-routes.js**  
[
const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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

  const db = new sqlite3.Database('./measurement-male-database.sqlite');

  db.serialize(() => {
    // Create measurement male table
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
    )`);

    // Create indexes
    ['client_name', 'measurement_date', 'size_number'].forEach(field => {
      db.run(`CREATE INDEX IF NOT EXISTS idx_malemeasurement_${field} ON MaleMeasurement(${field})`);
    });

    // Create trigger for auto-updating timestamp
    db.run(`CREATE TRIGGER IF NOT EXISTS update_malemeasurement_timestamp 
      AFTER UPDATE ON MaleMeasurement
      BEGIN
        UPDATE MaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END`);
  });
]

**CODE 3 - File: api.js**  
[  
    const express = require('express');
    const measurementMaleRouter = require('./measurement-male-route'); // import the male measurement router

    const apiRouter = express.Router();

    // Mount the male measurement routes under /measurements/male
    apiRouter.use('/measurements/male', measurementMaleRouter);

    // You can add other routers (female, etc.) here later

    module.exports = apiRouter;
]

**CODE 4 - File: server.js**  
[  
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const express = require('express');
const morgan = require('morgan');

const apiRouter = require('./routes/api.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', apiRouter);

// Basic error logging (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});
app.use(errorhandler());

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});

module.exports = app;
]

**CODE 4 - File: README.md** 
[
  Izzy-Alteration
  ├─ backend
  │  ├─ api.js
  │  ├─ backend-deepseek-prompt
  │  │  ├─ create-test-on-route.md
  │  │  └─ debugging-backend.md
  │  ├─ features
  │  │  ├─ alteration
  │  │  └─ measurement
  │  │     ├─ female
  │  │     └─ male
  │  │        ├─ measurement-male-database.sqlite
  │  │        ├─ measurement-male-migration.js
  │  │        └─ measurement-male-routes.js
  │  ├─ package-lock.json
  │  ├─ package.json
  │  ├─ server.js
  │  └─ test
  │     ├─ alteration
  │     └─ measurement
  │        ├─ female
  │        ├─ male
  │        │  ├─ measurement-male-seed.js
  │        │  ├─ measurement-male-test.sqlite
  │        │  └─ measurement-male.test.js
  │        └─ measurement-male-instructions.md
  └─ frontend
    ├─ frontend-deepseek-prompt
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

**CODE 5 - File: package.json**
[
    {
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "mocha test/**/*.test.js"
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

**CODE 6 - File: measurement-male.test.js**
[
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
      measurementMaleRouter = require('../../../features/measurement/male/measurement-male-routes');

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
]

**CODE 7 - File: measurement-male-seedjs**  
[
  // seed-measurement-male.js
  // Usage: node seed-measurement-male.js
  // Populates measurement-male-test.sqlite with sample data.

  const sqlite3 = require('sqlite3');
  const path = require('path');

  const dbPath = path.join(__dirname, 'measurement-male-test.sqlite');
  const db = new sqlite3.Database(dbPath);

  // Ensure the table exists (same schema as in migration)
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS MaleMeasurement (
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
      )
    `);

    // Sample data – 5 varied records
    const sampleData = [
      {
        neck: 38.5, shoulder_length: 45.0, arm_length: 62.0, across_front: 42.0,
        chest_circumference: 98.0, waist: 82.0, hip_circumference: 96.0, total_rise: 28.0,
        thigh: 56.0, knee: 38.0, calf: 36.0, ankle: 24.0, bicep: 32.0, elbow: 28.0,
        wrist: 18.0, inseam_ankle: 72.0, inseam_floor: 100.0, neck_waist: 45.0,
        neck_floor: 140.0, waist_floor: 105.0, height: 175.0, client_name: 'John Doe',
        size_number: 'M', measurement_date: '2025-02-20'
      },
      {
        neck: 40.0, shoulder_length: 46.5, arm_length: 64.0, across_front: 43.5,
        chest_circumference: 104.0, waist: 88.0, hip_circumference: 102.0, total_rise: 29.5,
        thigh: 58.5, knee: 40.0, calf: 37.5, ankle: 25.0, bicep: 34.0, elbow: 29.5,
        wrist: 19.0, inseam_ankle: 76.0, inseam_floor: 105.0, neck_waist: 47.0,
        neck_floor: 148.0, waist_floor: 110.0, height: 182.0, client_name: 'Mike Smith',
        size_number: 'L', measurement_date: '2025-03-01'
      },
      {
        neck: 36.0, shoulder_length: 43.0, arm_length: 60.0, across_front: 40.0,
        chest_circumference: 92.0, waist: 76.0, hip_circumference: 90.0, total_rise: 27.0,
        thigh: 53.0, knee: 36.0, calf: 34.0, ankle: 22.5, bicep: 30.0, elbow: 26.5,
        wrist: 17.0, inseam_ankle: 70.0, inseam_floor: 97.0, neck_waist: 43.0,
        neck_floor: 135.0, waist_floor: 100.0, height: 168.0, client_name: 'Alex Brown',
        size_number: 'S', measurement_date: '2025-04-10'
      },
      {
        neck: 42.0, shoulder_length: 48.0, arm_length: 66.0, across_front: 46.0,
        chest_circumference: 110.0, waist: 94.0, hip_circumference: 108.0, total_rise: 31.0,
        thigh: 62.0, knee: 42.0, calf: 39.0, ankle: 26.0, bicep: 36.0, elbow: 31.0,
        wrist: 20.0, inseam_ankle: 78.0, inseam_floor: 108.0, neck_waist: 50.0,
        neck_floor: 155.0, waist_floor: 115.0, height: 185.0, client_name: 'David Lee',
        size_number: 'XL', measurement_date: '2025-05-15'
      },
      {
        neck: 37.0, shoulder_length: 44.0, arm_length: 61.5, across_front: 41.0,
        chest_circumference: 95.0, waist: 80.0, hip_circumference: 93.0, total_rise: 27.5,
        thigh: 54.5, knee: 37.0, calf: 35.0, ankle: 23.0, bicep: 31.0, elbow: 27.0,
        wrist: 17.5, inseam_ankle: 71.5, inseam_floor: 99.0, neck_waist: 44.0,
        neck_floor: 138.0, waist_floor: 102.0, height: 172.0, client_name: 'Chris Evans',
        size_number: 'M', measurement_date: '2025-06-01'
      }
    ];

    const stmt = db.prepare(`
      INSERT INTO MaleMeasurement (
        neck, shoulder_length, arm_length, across_front, chest_circumference, waist,
        hip_circumference, total_rise, thigh, knee, calf, ankle, bicep, elbow, wrist,
        inseam_ankle, inseam_floor, neck_waist, neck_floor, waist_floor, height,
        client_name, size_number, measurement_date
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `);

    sampleData.forEach(record => {
      stmt.run(
        record.neck, record.shoulder_length, record.arm_length, record.across_front,
        record.chest_circumference, record.waist, record.hip_circumference, record.total_rise,
        record.thigh, record.knee, record.calf, record.ankle, record.bicep, record.elbow,
        record.wrist, record.inseam_ankle, record.inseam_floor, record.neck_waist,
        record.neck_floor, record.waist_floor, record.height, record.client_name,
        record.size_number, record.measurement_date
      );
    });

    stmt.finalize(() => {
      console.log('Seed data inserted successfully.');
      db.close();
    });
  });
]

**ERROR/ISSUE:**
[
bernard@ubuntu:~/Documents/Izzy-Alteration/backend$ node test/measurement-male-seed.js
node:internal/modules/cjs/loader:1210
  throw err;
  ^

Error: Cannot find module '/home/bernard/Documents/Izzy-Alteration/backend/test/measurement-male-seed.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1207:15)
    at Module._load (node:internal/modules/cjs/loader:1038:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
]

**REQUEST:**
[
    1. fix the issue
]