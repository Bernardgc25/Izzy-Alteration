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

const apiRouter = express.Router();

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

**ERROR/ISSUE:**
[

]

**REQUEST:**
[
    1. create a mocha test that validates all CRUD operations in File: measurement-male-route.js
    2. provide instruction on how to use the test
]