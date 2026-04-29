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
    )`, (err) => {
      if (err) {
        console.error('❌ Error creating FemaleMeasurement table:', err.message);
      } else {
        console.log('✅ FemaleMeasurement table ready.');
      }
    });

    // Create indexes
    ['client_name', 'measurement_date', 'size_number'].forEach(field => {
      db.run(`CREATE INDEX IF NOT EXISTS idx_femalemeasurement_${field} ON FemaleMeasurement(${field})`, (err) => {
        if (err) console.error(`❌ Index idx_femalemeasurement_${field} failed:`, err.message);
        else console.log(`✅ Index idx_femalemeasurement_${field} created.`);
      });
    });

    // Create trigger
    db.run(`CREATE TRIGGER IF NOT EXISTS update_femalemeasurement_timestamp 
      AFTER UPDATE ON FemaleMeasurement
      BEGIN
        UPDATE FemaleMeasurement SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
      END`, (err) => {
      if (err) console.error('❌ Trigger creation failed:', err.message);
      else console.log('✅ Trigger update_femalemeasurement_timestamp created.');
    });
  });

  db.close((err) => {
    if (err) console.error('❌ Error closing database:', err.message);
    else console.log('🔒 Database connection closed.');
  });
]

**CODE 3 - File: measurement-male-routes.js**  
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


**CODE 4 - File: measurement-male-migrationjs**  
[
  const sqlite3 = require('sqlite3');

  const db = new sqlite3.Database('./measurement-male-database.sqlite');

  db.serialize(() => {
    // Create measurement male table
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

**CODE 5 - File: README.md**  
[
  Izzy-Alteration
  ├─ backend
  │  ├─ api.js
  │  ├─ backend-deepseek-prompt
  │  │  ├─ create-test-on-route.md
  │  │  └─ debugging-backend.md
  │  ├─ features
  │  │  └─ measurement
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
  │        ├─ male
  │        │  ├─ measurement-male-seed.js
  │        │  ├─ measurement-male-test.sqlite
  │        │  └─ measurement-male.test.js
  │        └─ measurement-male-instructions.md
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


**CODE 6 - File: api.js**
[
  const express = require('express');
  const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes'); // import the male measurement router
  const measurementMaleRouter = require('./features/measurement/female/measurement-female-routes'); // import the female measurement router


  const apiRouter = express.Router();

  // Mount the male measurement routes under /measurements/male
  apiRouter.use('/measurements/male', measurementMaleRouter);
  // Mount the female measurement routes under /measurements/female
  apiRouter.use('/measurements/female', measurementFemaleRouter); 

  // You can add other routers (female, etc.) here later
      
  module.exports = apiRouter;

] 


**ERROR/ISSUE:**
[
  none
]

**REQUEST:**
[
  1. add mocha test cases for measurement-female-routes.js and measurement-female-migration.js 
  2. combine them into a single file named measurement-female.test.js
]