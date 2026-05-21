**CODE 1 - File: measurement-male-migration.js** 
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

**CODE 2 - File: measurement-male-routes.js**  
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


**CODE 3 - File: measurement-male-seeding** 
[
    // =============================================================================
    // File: backend/features/measurement/male/measurement-male-seeding.js
    // HOW TO RUN:
    //   From the project root, go to the backend directory and execute:
    //   node features/measurement/male/measurement-male-seeding.js
    //   OR, if you are already in the "male" folder:
    //   node measurement-male-seeding.js
    // =============================================================================

    const sqlite3 = require('sqlite3');
    const path = require('path');

    // Path to the database file (same database used by the migration script and routes)
    const dbPath = path.resolve(__dirname, 'measurement-male-database.sqlite');
    const db = new sqlite3.Database(dbPath);

    // -----------------------------------------------------------------------------
    // Sample measurement data to seed (4 records, can be extended as needed)
    // -----------------------------------------------------------------------------
    const sampleMeasurements = [
    {
        neck: 38.0,
        shoulder_length: 16.5,
        arm_length: 60.0,
        across_front: 42.0,
        chest_circumference: 98.0,
        waist: 84.0,
        hip_circumference: 102.0,
        total_rise: 28.0,
        thigh: 58.0,
        knee: 37.0,
        calf: 36.0,
        ankle: 24.0,
        bicep: 32.0,
        elbow: 26.0,
        wrist: 18.0,
        inseam_ankle: 76.0,
        inseam_floor: 78.0,
        neck_waist: 44.0,
        neck_floor: 140.0,
        waist_floor: 108.0,
        height: 178.0,
        client_name: 'John Doe',
        size_number: 'M',
        measurement_date: '2025-07-01'
    },
    {
        neck: 40.0,
        shoulder_length: 17.0,
        arm_length: 62.0,
        across_front: 44.0,
        chest_circumference: 104.0,
        waist: 90.0,
        hip_circumference: 108.0,
        total_rise: 30.0,
        thigh: 62.0,
        knee: 39.0,
        calf: 38.0,
        ankle: 25.5,
        bicep: 34.0,
        elbow: 28.0,
        wrist: 19.0,
        inseam_ankle: 79.0,
        inseam_floor: 81.0,
        neck_waist: 46.0,
        neck_floor: 144.0,
        waist_floor: 112.0,
        height: 182.0,
        client_name: 'Michael Smith',
        size_number: 'L',
        measurement_date: '2025-07-05'
    },
    {
        neck: 37.0,
        shoulder_length: 16.0,
        arm_length: 58.0,
        across_front: 40.0,
        chest_circumference: 92.0,
        waist: 78.0,
        hip_circumference: 96.0,
        total_rise: 26.0,
        thigh: 54.0,
        knee: 35.0,
        calf: 34.0,
        ankle: 22.5,
        bicep: 30.0,
        elbow: 24.5,
        wrist: 17.0,
        inseam_ankle: 73.0,
        inseam_floor: 75.0,
        neck_waist: 42.0,
        neck_floor: 136.0,
        waist_floor: 104.0,
        height: 175.0,
        client_name: 'Robert Johnson',
        size_number: 'S',
        measurement_date: '2025-07-10'
    },
    {
        neck: 42.0,
        shoulder_length: 18.0,
        arm_length: 64.0,
        across_front: 46.0,
        chest_circumference: 110.0,
        waist: 96.0,
        hip_circumference: 114.0,
        total_rise: 32.0,
        thigh: 66.0,
        knee: 41.0,
        calf: 40.0,
        ankle: 27.0,
        bicep: 36.0,
        elbow: 30.0,
        wrist: 20.0,
        inseam_ankle: 82.0,
        inseam_floor: 84.0,
        neck_waist: 48.0,
        neck_floor: 148.0,
        waist_floor: 116.0,
        height: 185.0,
        client_name: 'David Williams',
        size_number: 'XL',
        measurement_date: '2025-07-15'
    }
    ];

    // -----------------------------------------------------------------------------
    // Insert seed data (no pre‑check – always adds the sample rows)
    // -----------------------------------------------------------------------------
    console.log('🌱 Seeding MaleMeasurement table...');

    db.serialize(() => {
    // Prepare the insert statement once
    const insertStmt = db.prepare(`
        INSERT INTO MaleMeasurement (
        neck, shoulder_length, arm_length, across_front, chest_circumference,
        waist, hip_circumference, total_rise,
        thigh, knee, calf, ankle, bicep, elbow, wrist,
        inseam_ankle, inseam_floor, neck_waist, neck_floor,
        waist_floor, height, client_name, size_number, measurement_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let insertedCount = 0;
    sampleMeasurements.forEach((m, index) => {
        insertStmt.run(
        m.neck, m.shoulder_length, m.arm_length, m.across_front,
        m.chest_circumference, m.waist, m.hip_circumference, m.total_rise,
        m.thigh, m.knee, m.calf, m.ankle, m.bicep, m.elbow, m.wrist,
        m.inseam_ankle, m.inseam_floor, m.neck_waist, m.neck_floor,
        m.waist_floor, m.height, m.client_name, m.size_number, m.measurement_date,
        function (err) {
            if (err) {
            console.error(`❌ Error inserting sample ${index + 1} (${m.client_name}):`, err.message);
            } else {
            insertedCount++;
            console.log(`   ✅ Inserted: ${m.client_name} (ID: ${this.lastID})`);
            }
        }
        );
    });

    // Finalize the statement and close the database when all insert attempts are done
    insertStmt.finalize(() => {
        console.log(`🎉 Seeding complete. ${insertedCount} record(s) added.`);
        db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err.message);
        } else {
            console.log('🔒 Database connection closed.');
        }
        });
    });
    });
]

**CODE 4 - File: measurement-female-migration.js** 
[
    // This script sets up the SQLite database for the FemaleMeasurement feature.
    // It creates the necessary table, indexes, and a trigger to automatically update 
    // the 'updated_at' timestamp on record updates.
    //
    // HOW TO RUN:
    //   from the backend directory:
    //     node features/measurement/female/measurement-female-migration.js

    const sqlite3 = require('sqlite3');
    const path = require('path');

    // Use absolute path to avoid directory confusion
    const dbPath = path.resolve(__dirname, 'measurement-female-database.sqlite');
    const db = new sqlite3.Database(dbPath);

    db.serialize(() => {
    // Create table
    db.run(`CREATE TABLE IF NOT EXISTS FemaleMeasurement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,         
        neck DECIMAL(5,2),                        -- A
        shoulder_length DECIMAL(5,2),             -- B
        arm_length DECIMAL(5,2),                  -- C
        chest_circumference DECIMAL(5,2),         -- D
        under_bust DECIMAL(5,2),                  -- E
        waist DECIMAL(5,2),                       -- F
        hipbone_circumference DECIMAL(5,2),       -- G
        hip_circumference DECIMAL(5,2),           -- H
        thigh DECIMAL(5,2),                       -- I
        knee DECIMAL(5,2),                        -- J
        calf DECIMAL(5,2),                        -- K
        ankle DECIMAL(5,2),                       -- L       
        bicep DECIMAL(5,2),                       -- M   
        elbow DECIMAL(5,2),                       -- N
        wrist DECIMAL(5,2),                       -- O
        inseam_ankle DECIMAL(5,2),                -- P
        inseam_floor DECIMAL(5,2),                -- Q
        neck_waist DECIMAL(5,2),                  -- R
        neck_floor DECIMAL(5,2),                  -- S
        waist_floor DECIMAL(5,2),                 -- T
        height DECIMAL(5,2),                      -- U
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

**CODE 5 - File: measurement-female-routes.js**   
[
    const express = require('express');
    const sqlite3 = require('sqlite3');

    // const db = new sqlite3.Database(process.env.TEST_DATABASE || './measurement-female-database.sqlite');
    // Use absolute path like the migration script does
    const path = require('path');
    const db = new sqlite3.Database(process.env.TEST_DATABASE || path.resolve(__dirname, 'measurement-female-database.sqlite'));
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

**CODE 6 - File: measurement-female-seeding.js**  
[
  // =============================================================================
  // File: backend/features/measurement/female/measurement-female-seeding.js
  // HOW TO RUN:
  //   From the project root, go to the backend directory and execute:
  //   node features/measurement/female/measurement-female-seeding.js
  //   OR, if you are already in the "female" folder:
  //   node measurement-female-seeding.js
  // =============================================================================

  const sqlite3 = require('sqlite3');
  const path = require('path');

  // Path to the database file (same database used by the migration script and routes)
  const dbPath = path.resolve(__dirname, 'measurement-female-database.sqlite');
  const db = new sqlite3.Database(dbPath);

  // -----------------------------------------------------------------------------
  // Sample measurement data to seed (4 records, can be extended as needed)
  // -----------------------------------------------------------------------------
  const sampleMeasurements = [
    {
      neck: 35.5,
      shoulder_length: 14.0,
      arm_length: 55.0,
      chest_circumference: 90.0,
      under_bust: 80.5,
      waist: 70.0,
      hipbone_circumference: 95.0,
      hip_circumference: 100.0,
      thigh: 58.0,
      knee: 36.0,
      calf: 34.0,
      ankle: 22.0,
      bicep: 28.0,
      elbow: 24.0,
      wrist: 16.0,
      inseam_ankle: 72.0,
      inseam_floor: 74.0,
      neck_waist: 40.0,
      neck_floor: 130.0,
      waist_floor: 100.0,
      height: 165.0,
      client_name: 'Alice Smith',
      size_number: 'M',
      measurement_date: '2025-06-01'
    },
    {
      neck: 36.0,
      shoulder_length: 15.0,
      arm_length: 56.5,
      chest_circumference: 94.0,
      under_bust: 84.0,
      waist: 74.0,
      hipbone_circumference: 98.0,
      hip_circumference: 104.0,
      thigh: 60.0,
      knee: 37.5,
      calf: 35.5,
      ankle: 23.0,
      bicep: 30.0,
      elbow: 25.0,
      wrist: 17.0,
      inseam_ankle: 74.0,
      inseam_floor: 76.0,
      neck_waist: 42.0,
      neck_floor: 133.0,
      waist_floor: 102.0,
      height: 168.0,
      client_name: 'Becky Johnson',
      size_number: 'L',
      measurement_date: '2025-06-05'
    },
    {
      neck: 34.0,
      shoulder_length: 13.5,
      arm_length: 53.0,
      chest_circumference: 86.0,
      under_bust: 76.0,
      waist: 66.0,
      hipbone_circumference: 90.0,
      hip_circumference: 95.0,
      thigh: 55.0,
      knee: 34.0,
      calf: 32.5,
      ankle: 20.5,
      bicep: 26.0,
      elbow: 22.5,
      wrist: 15.0,
      inseam_ankle: 69.0,
      inseam_floor: 71.0,
      neck_waist: 38.0,
      neck_floor: 127.0,
      waist_floor: 96.0,
      height: 160.0,
      client_name: 'Catherine White',
      size_number: 'S',
      measurement_date: '2025-06-10'
    },
    {
      neck: 37.0,
      shoulder_length: 15.5,
      arm_length: 57.0,
      chest_circumference: 98.0,
      under_bust: 88.0,
      waist: 78.0,
      hipbone_circumference: 102.0,
      hip_circumference: 108.0,
      thigh: 62.0,
      knee: 38.5,
      calf: 36.5,
      ankle: 24.0,
      bicep: 31.0,
      elbow: 26.5,
      wrist: 17.5,
      inseam_ankle: 75.0,
      inseam_floor: 77.0,
      neck_waist: 43.0,
      neck_floor: 136.0,
      waist_floor: 105.0,
      height: 170.0,
      client_name: 'Diana Prince',
      size_number: 'XL',
      measurement_date: '2025-06-15'
    }
  ];

  // -----------------------------------------------------------------------------
  // Insert seed data (no pre‑check – always adds the sample rows)
  // -----------------------------------------------------------------------------
  console.log('🌱 Seeding FemaleMeasurement table...');

  db.serialize(() => {
    // Prepare the insert statement once
    const insertStmt = db.prepare(`
      INSERT INTO FemaleMeasurement (
        neck, shoulder_length, arm_length, chest_circumference, under_bust, waist,
        hipbone_circumference, hip_circumference,
        thigh, knee, calf, ankle, bicep, elbow, wrist,
        inseam_ankle, inseam_floor, neck_waist, neck_floor,
        waist_floor, height, client_name, size_number, measurement_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let insertedCount = 0;
    sampleMeasurements.forEach((m, index) => {
      insertStmt.run(
        m.neck, m.shoulder_length, m.arm_length, m.chest_circumference,
        m.under_bust, m.waist, m.hipbone_circumference, m.hip_circumference,
        m.thigh, m.knee, m.calf, m.ankle, m.bicep, m.elbow, m.wrist,
        m.inseam_ankle, m.inseam_floor, m.neck_waist, m.neck_floor,
        m.waist_floor, m.height, m.client_name, m.size_number, m.measurement_date,
        function (err) {
          if (err) {
            console.error(`❌ Error inserting sample ${index + 1} (${m.client_name}):`, err.message);
          } else {
            insertedCount++;
            console.log(`   ✅ Inserted: ${m.client_name} (ID: ${this.lastID})`);
          }
        }
      );
    });

    // Finalize the statement and close the database when all insert attempts are done
    insertStmt.finalize(() => {
      console.log(`🎉 Seeding complete. ${insertedCount} record(s) added.`);
      db.close((err) => {
        if (err) {
          console.error('❌ Error closing database:', err.message);
        } else {
          console.log('🔒 Database connection closed.');
        }
      });
    });
  });
] 

**CODE 7 - File: api.js**   
[
    const express = require('express');
    const measurementMaleRouter = require('./features/measurement/male/measurement-male-routes');
    const measurementFemaleRouter = require('./features/measurement/female/measurement-female-routes'); // <-- changed variable name

    const apiRouter = express.Router();

    apiRouter.use('/measurements/male', measurementMaleRouter);
    apiRouter.use('/measurements/female', measurementFemaleRouter);

    module.exports = apiRouter;
]

**CODE 8 - File: server.js**
[
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const errorhandler = require('errorhandler');
    const express = require('express');
    const morgan = require('morgan');

    const apiRouter = require('./api');

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

**CODE 9 - File: README.md**   
[
    Izzy-Alteration
  ├─ Package-list.md
  ├─ backend
  │  ├─ api.js
  │  ├─ backend-deepseek-prompt
  │  │  ├─ create-test-on-route.md
  │  │  ├─ debugging-backend.md
  │  │  ├─ features-measurement-routes-migration.md
  │  │  ├─ measurement-API-Postman-debug.md
  │  │  ├─ measurement-API-postman-test.md
  │  │  ├─ measurement-female.md
  │  │  ├─ measurement-male-routes-migration-test.md
  │  │  └─ measurement-male-seeding.md
  │  ├─ config
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
  │  │        ├─ measurement-male-routes.js
  │  │        └─ measurement-male-seeding.js
  │  ├─ package-lock.json
  │  ├─ package.json
  │  ├─ postman
  │  │  └─ measurment-API-test
  │  │     ├─ female-measurements-crud-tests.postman_collection.json
  │  │     └─ male-measurements-crud-tests.postman_collection.json
  │  ├─ server.js
  │  └─ test
  │     └─ measurement
  │        ├─ Instruction-measurement-test.md
  │        ├─ measurement-female.test.js
  │        └─ measurement-male.test.js
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

**CODE 10 - File: measurement-female.test.js** 
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
      const apiRouter = require('../../api');  // mounts measurement-female-routes
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

**CODE 11 - File: measurement-male.test.js** 
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
]  

**CODE 12 - File: package.json** 
[
  {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "scripts": {
      "test": "mocha test/**/*.test.js",
      "test:female": "mocha test/measurement/measurement-female.test.js --timeout 5000",
      "test:male": "mocha test/measurement/measurement-male.test.js --timeout 5000"
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
  what is causing this error?
  [
      bernard@ubuntu:~/Documents/Izzy-Alteration/backend$ npm run test:measurements

    > backend@1.0.0 test:measurements
    > mocha test/measurement/measurement-female.test.js test/measurement/measurement-male.test.js --timeout 5000



      Measurement Female (Routes + Migration)
        Database Schema (migration)
          ✔ should have the FemaleMeasurement table
          ✔ should have all required columns with expected types
          ✔ should have indexes on client_name, measurement_date, and size_number
          ✔ should fire trigger and update updated_at on UPDATE (1520ms)
        API /api/measurements/female
          GET /
            ✔ should return an empty array when no records exist
            ✔ should return all inserted records
          GET /:id
            ✔ should return a single record for a valid ID
            ✔ should return 404 for a non‑existent ID
            ✔ should return 404 for an invalid ID format (non‑numeric)
          POST /
            ✔ should create a new measurement and return its ID
            ✔ should fail with 500 when required client_name is missing
            ✔ should fail with 500 when required measurement_date is missing
            ✔ should still insert when optional fields are omitted (they become NULL)
          PUT /:id
            ✔ should update an existing measurement and return success message
            ✔ should return 404 when ID does not exist
            ✔ should fail with 500 if required fields are missing in update
          DELETE /:id
            ✔ should delete a measurement and return success message
            ✔ should return 404 when deleting a non‑existent ID

      Measurement Male (Routes + Migration)
        Database Schema (migration)
          ✔ should have the MaleMeasurement table
          ✔ should have all required columns with expected types
          ✔ should have indexes on client_name, measurement_date, and size_number
          ✔ should fire trigger and update updated_at on UPDATE (1519ms)
        API /api/measurements/male
          GET /
            1) should return an empty array when no records exist
            2) should return all inserted records
          GET /:id
            3) should return a single record for a valid ID
            4) should return 404 for a non‑existent ID
            5) should return 404 for an invalid ID format (non‑numeric)
          POST /
            6) should create a new measurement and return its ID
            7) should fail with 500 when required client_name is missing
            8) should fail with 500 when required measurement_date is missing
            9) should still insert when optional fields are omitted (they become NULL)
          PUT /:id
            10) should update an existing measurement and return success message
            11) should return 404 when ID does not exist
            12) should fail with 500 if required fields are missing in update
          DELETE /:id
            13) should delete a measurement and return success message
            14) should return 404 when deleting a non‑existent ID


      22 passing (3s)
      14 failing

      1) Measurement Male (Routes + Migration)
          API /api/measurements/male
            GET /
              should return an empty array when no records exist:

          AssertionError: expected 500 to equal 200
          + expected - actual

          -500
          +200
          
          at Context.<anonymous> (test/measurement/measurement-male.test.js:271:31)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      2) Measurement Male (Routes + Migration)
          API /api/measurements/male
            GET /
              should return all inserted records:
        Error: expected 201 "Created", got 500 "Internal Server Error"
          at insertSample (test/measurement/measurement-male.test.js:260:10)
          at Context.<anonymous> (test/measurement/measurement-male.test.js:276:15)
          at process.processImmediate (node:internal/timers:483:21)
      ----
          at Test._assertStatus (node_modules/supertest/lib/test.js:309:14)
          at /home/bernard/Documents/Izzy-Alteration/backend/node_modules/supertest/lib/test.js:365:13
          at Test._assertFunction (node_modules/supertest/lib/test.js:342:13)
          at Test.assert (node_modules/supertest/lib/test.js:195:23)
          at localAssert (node_modules/supertest/lib/test.js:138:14)
          at Server.<anonymous> (node_modules/supertest/lib/test.js:152:11)
          at Object.onceWrapper (node:events:638:28)
          at Server.emit (node:events:524:28)
          at emitCloseNT (node:net:2344:8)
          at process.processTicksAndRejections (node:internal/process/task_queues:81:21)

      3) Measurement Male (Routes + Migration)
          API /api/measurements/male
            GET /:id
              should return a single record for a valid ID:
        Error: expected 201 "Created", got 500 "Internal Server Error"
          at insertSample (test/measurement/measurement-male.test.js:260:10)
          at Context.<anonymous> (test/measurement/measurement-male.test.js:291:26)
          at process.processImmediate (node:internal/timers:483:21)
      ----
          at Test._assertStatus (node_modules/supertest/lib/test.js:309:14)
          at /home/bernard/Documents/Izzy-Alteration/backend/node_modules/supertest/lib/test.js:365:13
          at Test._assertFunction (node_modules/supertest/lib/test.js:342:13)
          at Test.assert (node_modules/supertest/lib/test.js:195:23)
          at localAssert (node_modules/supertest/lib/test.js:138:14)
          at Server.<anonymous> (node_modules/supertest/lib/test.js:152:11)
          at Object.onceWrapper (node:events:638:28)
          at Server.emit (node:events:524:28)
          at emitCloseNT (node:net:2344:8)
          at process.processTicksAndRejections (node:internal/process/task_queues:81:21)

      4) Measurement Male (Routes + Migration)
          API /api/measurements/male
            GET /:id
              should return 404 for a non‑existent ID:

          AssertionError: expected 500 to equal 404
          + expected - actual

          -500
          +404
          
          at Context.<anonymous> (test/measurement/measurement-male.test.js:303:31)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      5) Measurement Male (Routes + Migration)
          API /api/measurements/male
            GET /:id
              should return 404 for an invalid ID format (non‑numeric):

          AssertionError: expected 500 to equal 404
          + expected - actual

          -500
          +404
          
          at Context.<anonymous> (test/measurement/measurement-male.test.js:310:31)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      6) Measurement Male (Routes + Migration)
          API /api/measurements/male
            POST /
              should create a new measurement and return its ID:

          AssertionError: expected 500 to equal 201
          + expected - actual

          -500
          +201
          
          at Context.<anonymous> (test/measurement/measurement-male.test.js:347:31)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      7) Measurement Male (Routes + Migration)
          API /api/measurements/male
            POST /
              should fail with 500 when required client_name is missing:
        AssertionError: expected 'SQLITE_ERROR: no such table: MaleMeas…' to include 'NOT NULL'
          at Context.<anonymous> (test/measurement/measurement-male.test.js:359:57)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      8) Measurement Male (Routes + Migration)
          API /api/measurements/male
            POST /
              should fail with 500 when required measurement_date is missing:
        AssertionError: expected 'SQLITE_ERROR: no such table: MaleMeas…' to include 'NOT NULL'
          at Context.<anonymous> (test/measurement/measurement-male.test.js:369:57)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      9) Measurement Male (Routes + Migration)
          API /api/measurements/male
            POST /
              should still insert when optional fields are omitted (they become NULL):

          AssertionError: expected 500 to equal 201
          + expected - actual

          -500
          +201
          
          at Context.<anonymous> (test/measurement/measurement-male.test.js:379:31)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      10) Measurement Male (Routes + Migration)
          API /api/measurements/male
            PUT /:id
              should update an existing measurement and return success message:
        Error: expected 201 "Created", got 500 "Internal Server Error"
          at insertSample (test/measurement/measurement-male.test.js:260:10)
          at Context.<anonymous> (test/measurement/measurement-male.test.js:389:26)
          at process.processImmediate (node:internal/timers:483:21)
      ----
          at Test._assertStatus (node_modules/supertest/lib/test.js:309:14)
          at /home/bernard/Documents/Izzy-Alteration/backend/node_modules/supertest/lib/test.js:365:13
          at Test._assertFunction (node_modules/supertest/lib/test.js:342:13)
          at Test.assert (node_modules/supertest/lib/test.js:195:23)
          at localAssert (node_modules/supertest/lib/test.js:138:14)
          at Server.<anonymous> (node_modules/supertest/lib/test.js:152:11)
          at Object.onceWrapper (node:events:638:28)
          at Server.emit (node:events:524:28)
          at emitCloseNT (node:net:2344:8)
          at process.processTicksAndRejections (node:internal/process/task_queues:81:21)

      11) Measurement Male (Routes + Migration)
          API /api/measurements/male
            PUT /:id
              should return 404 when ID does not exist:

          AssertionError: expected 500 to equal 404
          + expected - actual

          -500
          +404
          
          at Context.<anonymous> (test/measurement/measurement-male.test.js:434:31)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

      12) Measurement Male (Routes + Migration)
          API /api/measurements/male
            PUT /:id
              should fail with 500 if required fields are missing in update:
        Error: expected 201 "Created", got 500 "Internal Server Error"
          at insertSample (test/measurement/measurement-male.test.js:260:10)
          at Context.<anonymous> (test/measurement/measurement-male.test.js:439:26)
          at process.processImmediate (node:internal/timers:483:21)
      ----
          at Test._assertStatus (node_modules/supertest/lib/test.js:309:14)
          at /home/bernard/Documents/Izzy-Alteration/backend/node_modules/supertest/lib/test.js:365:13
          at Test._assertFunction (node_modules/supertest/lib/test.js:342:13)
          at Test.assert (node_modules/supertest/lib/test.js:195:23)
          at localAssert (node_modules/supertest/lib/test.js:138:14)
          at Server.<anonymous> (node_modules/supertest/lib/test.js:152:11)
          at Object.onceWrapper (node:events:638:28)
          at Server.emit (node:events:524:28)
          at emitCloseNT (node:net:2344:8)
          at process.processTicksAndRejections (node:internal/process/task_queues:81:21)

      13) Measurement Male (Routes + Migration)
          API /api/measurements/male
            DELETE /:id
              should delete a measurement and return success message:
        Error: expected 201 "Created", got 500 "Internal Server Error"
          at insertSample (test/measurement/measurement-male.test.js:260:10)
          at Context.<anonymous> (test/measurement/measurement-male.test.js:453:26)
          at process.processImmediate (node:internal/timers:483:21)
      ----
          at Test._assertStatus (node_modules/supertest/lib/test.js:309:14)
          at /home/bernard/Documents/Izzy-Alteration/backend/node_modules/supertest/lib/test.js:365:13
          at Test._assertFunction (node_modules/supertest/lib/test.js:342:13)
          at Test.assert (node_modules/supertest/lib/test.js:195:23)
          at localAssert (node_modules/supertest/lib/test.js:138:14)
          at Server.<anonymous> (node_modules/supertest/lib/test.js:152:11)
          at Object.onceWrapper (node:events:638:28)
          at Server.emit (node:events:524:28)
          at emitCloseNT (node:net:2344:8)
          at process.processTicksAndRejections (node:internal/process/task_queues:81:21)

      14) Measurement Male (Routes + Migration)
          API /api/measurements/male
            DELETE /:id
              should return 404 when deleting a non‑existent ID:

          AssertionError: expected 500 to equal 404
          + expected - actual

          -500
          +404
          
          at Context.<anonymous> (test/measurement/measurement-male.test.js:465:31)
          at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
  ]
]

**REQUEST:**
[
  fix it
]