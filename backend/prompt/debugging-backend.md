**CODE 1 - File: measurement-male-route.js**  
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

  const sql = `INSERT INTO MaleMeasurement (
    neck, shoulder_length, arm_length, across_front, chest_circumference, waist, hip_circumference, total_rise,
    thigh, knee, calf, ankle, bicep, elbow, wrist, inseam_ankle, inseam_floor, neck_waist, neck_floor,
    waist_floor, height, client_name, size_number, measurement_date
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
    }       
    else if (this.changes === 0) {
      res.status(404).json({ error: 'Measurement not found' });
    }
    else {
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
    }
    else if (this.changes === 0) {
      res.status(404).json({ error: 'Measurement not found' });
    }
    else {
      res.json({ message: 'Measurement deleted successfully' });
    }
  } );
});

module.exports = measurementMaleRouter;
] 

**CODE 2 - File: migration.js**  
[  
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database.sqlite');

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
│  ├─ backend-debugging.md
│  ├─ database.sqlite
│  ├─ migration.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ api.js
│  │  └─ measurement-male-route.js
│  ├─ server.js
│  └─ test
│     └─ measurement-male.test.js
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
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const sqlite3 = require('sqlite3');
const { expect } = chai;

chai.use(chaiHttp);

// Path to the router – adjust if your file location differs
const measurementMaleRouter = require('../routes/measurement-male-route');

// Helper to run the table creation and index statements (from migration.js)
const createTables = (db) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
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

      // Create trigger for auto-updating timestamp (optional for tests)
      db.run(`CREATE TRIGGER IF NOT EXISTS update_malemeasurement_timestamp 
        AFTER UPDATE ON MaleMeasurement
        BEGIN
          UPDATE MaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
        END`);
    }, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Minimal sample measurement data (includes required fields)
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
  let db;

  before(async () => {
    // Use an in-memory database for testing
    process.env.TEST_DATABASE = ':memory:';
    // Because the router creates the db when the module is required,
    // we need to ensure the env var is set BEFORE requiring it.
    // Re-require it (if already loaded, the module cache will still have the old db)
    // So we delete the cache entry for the router and for sqlite3? Simpler:
    // We'll create a new express app and mount a fresh router, but the router file itself
    // creates the db instance. Since we set the env var, the next require will use it.
    delete require.cache[require.resolve('../routes/measurement-male-route')];
    const freshRouter = require('../routes/measurement-male-route');
    
    // The router module now has a db connected to ':memory:'
    // Grab that db reference for table creation (the router's db is closed after tests? We'll keep it)
    db = freshRouter.db;  // Unfortunately the router doesn't export db. We need to access it.
    // Alternative: create a new db instance ourselves and override? Easier: 
    // We'll create the tables by importing the migration script logic here.
    // But we need the same db the router uses. Since we cannot easily get it,
    // we'll create our own db in memory, run migrations, then monkey-patch the router's db?
    // Better: modify the router slightly for testability? But requirement says don't change original code.
    // Another approach: The router uses process.env.TEST_DATABASE, so if we open the same path ':memory:',
    // each `new sqlite3.Database(':memory:')` creates a separate in-memory database – data is not shared.
    // That breaks tests because the router's db and our migration db are different.
    // So we must use a file-based test database to share.
  });

  // Better solution: use a temporary file on disk so the router and our setup share the same DB.
  // We'll implement that.
  let testDbPath;
  before(async () => {
    testDbPath = './test-database.sqlite'; // temporary file
    process.env.TEST_DATABASE = testDbPath;
    
    // Ensure module is reloaded with new env var
    delete require.cache[require.resolve('../routes/measurement-male-route')];
    const freshRouter = require('../routes/measurement-male-route');
    
    // Re-create the app with the new router
    const apiRouter = express.Router();
    apiRouter.use('/measurements/male', freshRouter);
    app = express();
    app.use(express.json());
    app.use('/api', apiRouter);
    
    // Create tables using a separate db instance pointing to the same file
    const setupDb = new sqlite3.Database(testDbPath);
    await createTables(setupDb);
    setupDb.close();
  });

  after((done) => {
    // Close the router's database connection (if possible – router does not expose db)
    // To clean up, delete the test database file.
    const fs = require('fs');
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    done();
  });

  // Helper to get the inserted id from a POST response
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
]

**ERROR/ISSUE:**
[
bernard@ubuntu:~/Documents/Izzy-Alteration/backend$ npm test

> backend@1.0.0 test
> mocha test/**/*.test.js



  Male Measurement CRUD Operations
    1) should CREATE a new male measurement via POST /api/measurements/male
    2) should GET all male measurements via GET /api/measurements/male
    3) should GET a specific measurement by id via GET /api/measurements/male/:id
    4) should return 404 for a non-existent measurement id
    5) should UPDATE an existing measurement via PUT /api/measurements/male/:id
    6) should return 404 when updating a non-existent measurement
    7) should DELETE a measurement via DELETE /api/measurements/male/:id
    8) should return 404 when deleting a non-existent measurement


  0 passing (104ms)
  8 failing

  1) Male Measurement CRUD Operations
       should CREATE a new male measurement via POST /api/measurements/male:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:136:28)
      at process.processImmediate (node:internal/timers:483:21)

  2) Male Measurement CRUD Operations
       should GET all male measurements via GET /api/measurements/male:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:146:28)
      at process.processImmediate (node:internal/timers:483:21)

  3) Male Measurement CRUD Operations
       should GET a specific measurement by id via GET /api/measurements/male/:id:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:154:28)
      at process.processImmediate (node:internal/timers:483:21)

  4) Male Measurement CRUD Operations
       should return 404 for a non-existent measurement id:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:160:28)
      at process.processImmediate (node:internal/timers:483:21)

  5) Male Measurement CRUD Operations
       should UPDATE an existing measurement via PUT /api/measurements/male/:id:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:167:28)
      at process.processImmediate (node:internal/timers:483:21)

  6) Male Measurement CRUD Operations
       should return 404 when updating a non-existent measurement:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:180:28)
      at process.processImmediate (node:internal/timers:483:21)

  7) Male Measurement CRUD Operations
       should DELETE a measurement via DELETE /api/measurements/male/:id:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:188:28)
      at process.processImmediate (node:internal/timers:483:21)

  8) Male Measurement CRUD Operations
       should return 404 when deleting a non-existent measurement:
     TypeError: chai.request is not a function
      at Context.<anonymous> (test/measurement-male.test.js:198:28)
      at process.processImmediate (node:internal/timers:483:21)
]

**REQUEST:**
[
    fix the issue
]