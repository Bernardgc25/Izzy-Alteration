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
    │  │  ├─ measurement-API-postman-test.md
    │  │  ├─ measurement-female.md
    │  │  ├─ measurement-male-routes-migration-test.md
    │  │  └─ measurement-male-seeding.md
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
    │  ├─ measurement-female-database.sqlite
    │  ├─ measurement-male-database.sqlite
    │  ├─ package-lock.json
    │  ├─ package.json
    │  ├─ postman
    │  │  └─ measurment-API-test
    │  │     ├─ female-measurements-collection.json
    │  │     └─ male-measurements-collection.json
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

**CODE 10 - File: package.json** 
[
    {
    "name": "backend",
    "version": "1.0.0",
    "description": "",
    "main": "server.js",
    "scripts": {
        "test": "mocha test/**/*.test.js",
        "test:female": "mocha test/measurement/female/measurement-female.test.js --timeout 5000",
        "test:male": "mocha test/measurement/male/measurement-male.test.js --timeout 5000"
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

**CODE 11 - File: female-measurements-collection.json** 
[
        {
    "info": {
        "name": "Female Measurements API",
        "description": "Comprehensive tests for Female Measurement routes (CRUD operations)",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "variable": [
        {
        "key": "baseUrl",
        "value": "http://localhost:3000/api/measurements/female"
        },
        {
        "key": "createdId",
        "value": ""
        }
    ],
    "item": [
        {
        "name": "GET All Female Measurements",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response is an array', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.be.an('array');",
                "});",
                "",
                "pm.test('Response time is less than 500ms', function () {",
                "    pm.expect(pm.response.responseTime).to.be.below(500);",
                "});",
                "",
                "pm.test('Response has correct headers', function () {",
                "    pm.response.to.have.header('Content-Type', 'application/json; charset=utf-8');",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "GET",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}",
            "host": ["{{baseUrl}}"]
            }
        }
        },
        {
        "name": "POST Create New Female Measurement",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 201 Created', function () {",
                "    pm.response.to.have.status(201);",
                "});",
                "",
                "pm.test('Response has an id property', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('id');",
                "    pm.expect(jsonData.id).to.be.a('number');",
                "    pm.collectionVariables.set('createdId', jsonData.id);",
                "});",
                "",
                "pm.test('Response time is less than 1000ms', function () {",
                "    pm.expect(pm.response.responseTime).to.be.below(1000);",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "POST",
            "header": [
            {
                "key": "Content-Type",
                "value": "application/json"
            }
            ],
            "body": {
            "mode": "raw",
            "raw": "{\n  \"neck\": 35.5,\n  \"shoulder_length\": 14.0,\n  \"arm_length\": 55.0,\n  \"chest_circumference\": 90.0,\n  \"under_bust\": 80.5,\n  \"waist\": 70.0,\n  \"hipbone_circumference\": 95.0,\n  \"hip_circumference\": 100.0,\n  \"thigh\": 58.0,\n  \"knee\": 36.0,\n  \"calf\": 34.0,\n  \"ankle\": 22.0,\n  \"bicep\": 28.0,\n  \"elbow\": 24.0,\n  \"wrist\": 16.0,\n  \"inseam_ankle\": 72.0,\n  \"inseam_floor\": 74.0,\n  \"neck_waist\": 40.0,\n  \"neck_floor\": 130.0,\n  \"waist_floor\": 100.0,\n  \"height\": 165.0,\n  \"client_name\": \"Test User Female\",\n  \"size_number\": \"M\",\n  \"measurement_date\": \"2026-05-12\"\n}"
            },
            "url": {
            "raw": "{{baseUrl}}",
            "host": ["{{baseUrl}}"]
            }
        }
        },
        {
        "name": "GET Female Measurement by ID",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response has correct measurement data', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('client_name', 'Test User Female');",
                "    pm.expect(jsonData).to.have.property('size_number', 'M');",
                "    pm.expect(jsonData).to.have.property('neck', 35.5);",
                "    pm.expect(jsonData).to.have.property('under_bust', 80.5);",
                "    pm.expect(jsonData).to.have.property('hipbone_circumference', 95.0);",
                "});",
                "",
                "pm.test('Response has all required fields', function () {",
                "    var jsonData = pm.response.json();",
                "    const requiredFields = ['id', 'neck', 'client_name', 'measurement_date', 'under_bust', 'hipbone_circumference'];",
                "    requiredFields.forEach(field => {",
                "        pm.expect(jsonData).to.have.property(field);",
                "    });",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "GET",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}/{{createdId}}",
            "host": ["{{baseUrl}}"],
            "path": ["{{createdId}}"]
            }
        }
        },
        {
        "name": "PUT Update Female Measurement",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response has success message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('message', 'Measurement updated successfully');",
                "});",
                "",
                "pm.test('Verify update was applied', function () {",
                "    const getRequest = {",
                "        url: pm.collectionVariables.get('baseUrl') + '/' + pm.collectionVariables.get('createdId'),",
                "        method: 'GET'",
                "    };",
                "    pm.sendRequest(getRequest, (error, response) => {",
                "        if (error) {",
                "            console.log(error);",
                "        } else {",
                "            const updatedData = response.json();",
                "            pm.expect(updatedData.client_name).to.equal('Updated Test User Female');",
                "            pm.expect(updatedData.size_number).to.equal('L');",
                "            pm.expect(updatedData.under_bust).to.equal(84.0);",
                "        }",
                "    });",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "PUT",
            "header": [
            {
                "key": "Content-Type",
                "value": "application/json"
            }
            ],
            "body": {
            "mode": "raw",
            "raw": "{\n  \"neck\": 36.0,\n  \"shoulder_length\": 15.0,\n  \"arm_length\": 56.5,\n  \"chest_circumference\": 94.0,\n  \"under_bust\": 84.0,\n  \"waist\": 74.0,\n  \"hipbone_circumference\": 98.0,\n  \"hip_circumference\": 104.0,\n  \"thigh\": 60.0,\n  \"knee\": 37.5,\n  \"calf\": 35.5,\n  \"ankle\": 23.0,\n  \"bicep\": 30.0,\n  \"elbow\": 25.0,\n  \"wrist\": 17.0,\n  \"inseam_ankle\": 74.0,\n  \"inseam_floor\": 76.0,\n  \"neck_waist\": 42.0,\n  \"neck_floor\": 133.0,\n  \"waist_floor\": 102.0,\n  \"height\": 168.0,\n  \"client_name\": \"Updated Test User Female\",\n  \"size_number\": \"L\",\n  \"measurement_date\": \"2026-05-12\"\n}"
            },
            "url": {
            "raw": "{{baseUrl}}/{{createdId}}",
            "host": ["{{baseUrl}}"],
            "path": ["{{createdId}}"]
            }
        }
        },
        {
        "name": "DELETE Female Measurement",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response has success message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('message', 'Measurement deleted successfully');",
                "});",
                "",
                "pm.test('Verify the record no longer exists', function () {",
                "    const getRequest = {",
                "        url: pm.collectionVariables.get('baseUrl') + '/' + pm.collectionVariables.get('createdId'),",
                "        method: 'GET'",
                "    };",
                "    pm.sendRequest(getRequest, (error, response) => {",
                "        if (error) {",
                "            console.log(error);",
                "        } else {",
                "            pm.expect(response.status).to.equal(404);",
                "        }",
                "    });",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "DELETE",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}/{{createdId}}",
            "host": ["{{baseUrl}}"],
            "path": ["{{createdId}}"]
            }
        }
        },
        {
        "name": "GET Non-existent Female Measurement (404 test)",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 404', function () {",
                "    pm.response.to.have.status(404);",
                "});",
                "",
                "pm.test('Response has error message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('error', 'Measurement not found');",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "GET",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}/999999",
            "host": ["{{baseUrl}}"],
            "path": ["999999"]
            }
        }
        },
        {
        "name": "POST Invalid Female Measurement (Validation Test)",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 500 (invalid data)', function () {",
                "    pm.response.to.have.status(500);",
                "});",
                "",
                "pm.test('Response has error message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('error');",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "POST",
            "header": [
            {
                "key": "Content-Type",
                "value": "application/json"
            }
            ],
            "body": {
            "mode": "raw",
            "raw": "{\n  \"client_name\": \"Invalid Female User\"\n}"
            },
            "url": {
            "raw": "{{baseUrl}}",
            "host": ["{{baseUrl}}"]
            }
        }
        }
    ]
    }
]

**CODE 12 - File: male-measurements-collection.json**
[
    {
    "info": {
        "name": "Male Measurements API",
        "description": "Comprehensive tests for Male Measurement routes (CRUD operations)",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "variable": [
        {
        "key": "baseUrl",
        "value": "http://localhost:3000/api/measurements/male"
        },
        {
        "key": "createdId",
        "value": ""
        }
    ],
    "item": [
        {
        "name": "GET All Male Measurements",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response is an array', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.be.an('array');",
                "});",
                "",
                "pm.test('Response time is less than 500ms', function () {",
                "    pm.expect(pm.response.responseTime).to.be.below(500);",
                "});",
                "",
                "pm.test('Response has correct headers', function () {",
                "    pm.response.to.have.header('Content-Type', 'application/json; charset=utf-8');",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "GET",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}",
            "host": ["{{baseUrl}}"]
            }
        }
        },
        {
        "name": "POST Create New Male Measurement",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 201 Created', function () {",
                "    pm.response.to.have.status(201);",
                "});",
                "",
                "pm.test('Response has an id property', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('id');",
                "    pm.expect(jsonData.id).to.be.a('number');",
                "    pm.collectionVariables.set('createdId', jsonData.id);",
                "});",
                "",
                "pm.test('Response time is less than 1000ms', function () {",
                "    pm.expect(pm.response.responseTime).to.be.below(1000);",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "POST",
            "header": [
            {
                "key": "Content-Type",
                "value": "application/json"
            }
            ],
            "body": {
            "mode": "raw",
            "raw": "{\n  \"neck\": 38.5,\n  \"shoulder_length\": 16.5,\n  \"arm_length\": 60.0,\n  \"across_front\": 42.0,\n  \"chest_circumference\": 98.0,\n  \"waist\": 84.0,\n  \"hip_circumference\": 102.0,\n  \"total_rise\": 28.0,\n  \"thigh\": 58.0,\n  \"knee\": 37.0,\n  \"calf\": 36.0,\n  \"ankle\": 24.0,\n  \"bicep\": 32.0,\n  \"elbow\": 26.0,\n  \"wrist\": 18.0,\n  \"inseam_ankle\": 76.0,\n  \"inseam_floor\": 78.0,\n  \"neck_waist\": 44.0,\n  \"neck_floor\": 140.0,\n  \"waist_floor\": 108.0,\n  \"height\": 178.0,\n  \"client_name\": \"Test User Male\",\n  \"size_number\": \"M\",\n  \"measurement_date\": \"2026-05-12\"\n}"
            },
            "url": {
            "raw": "{{baseUrl}}",
            "host": ["{{baseUrl}}"]
            }
        }
        },
        {
        "name": "GET Male Measurement by ID",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response has correct measurement data', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('client_name', 'Test User Male');",
                "    pm.expect(jsonData).to.have.property('size_number', 'M');",
                "    pm.expect(jsonData).to.have.property('neck', 38.5);",
                "});",
                "",
                "pm.test('Response has all required fields', function () {",
                "    var jsonData = pm.response.json();",
                "    const requiredFields = ['id', 'neck', 'client_name', 'measurement_date'];",
                "    requiredFields.forEach(field => {",
                "        pm.expect(jsonData).to.have.property(field);",
                "    });",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "GET",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}/{{createdId}}",
            "host": ["{{baseUrl}}"],
            "path": ["{{createdId}}"]
            }
        }
        },
        {
        "name": "PUT Update Male Measurement",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response has success message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('message', 'Measurement updated successfully');",
                "});",
                "",
                "pm.test('Verify update was applied', function () {",
                "    // Send another GET request to verify the update",
                "    const getRequest = {",
                "        url: pm.collectionVariables.get('baseUrl') + '/' + pm.collectionVariables.get('createdId'),",
                "        method: 'GET'",
                "    };",
                "    pm.sendRequest(getRequest, (error, response) => {",
                "        if (error) {",
                "            console.log(error);",
                "        } else {",
                "            const updatedData = response.json();",
                "            pm.expect(updatedData.client_name).to.equal('Updated Test User Male');",
                "            pm.expect(updatedData.size_number).to.equal('L');",
                "        }",
                "    });",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "PUT",
            "header": [
            {
                "key": "Content-Type",
                "value": "application/json"
            }
            ],
            "body": {
            "mode": "raw",
            "raw": "{\n  \"neck\": 40.0,\n  \"shoulder_length\": 17.0,\n  \"arm_length\": 62.0,\n  \"across_front\": 44.0,\n  \"chest_circumference\": 104.0,\n  \"waist\": 90.0,\n  \"hip_circumference\": 108.0,\n  \"total_rise\": 30.0,\n  \"thigh\": 62.0,\n  \"knee\": 39.0,\n  \"calf\": 38.0,\n  \"ankle\": 25.5,\n  \"bicep\": 34.0,\n  \"elbow\": 28.0,\n  \"wrist\": 19.0,\n  \"inseam_ankle\": 79.0,\n  \"inseam_floor\": 81.0,\n  \"neck_waist\": 46.0,\n  \"neck_floor\": 144.0,\n  \"waist_floor\": 112.0,\n  \"height\": 182.0,\n  \"client_name\": \"Updated Test User Male\",\n  \"size_number\": \"L\",\n  \"measurement_date\": \"2026-05-12\"\n}"
            },
            "url": {
            "raw": "{{baseUrl}}/{{createdId}}",
            "host": ["{{baseUrl}}"],
            "path": ["{{createdId}}"]
            }
        }
        },
        {
        "name": "DELETE Male Measurement",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 200', function () {",
                "    pm.response.to.have.status(200);",
                "});",
                "",
                "pm.test('Response has success message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('message', 'Measurement deleted successfully');",
                "});",
                "",
                "pm.test('Verify the record no longer exists', function () {",
                "    const getRequest = {",
                "        url: pm.collectionVariables.get('baseUrl') + '/' + pm.collectionVariables.get('createdId'),",
                "        method: 'GET'",
                "    };",
                "    pm.sendRequest(getRequest, (error, response) => {",
                "        if (error) {",
                "            console.log(error);",
                "        } else {",
                "            pm.expect(response.status).to.equal(404);",
                "        }",
                "    });",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "DELETE",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}/{{createdId}}",
            "host": ["{{baseUrl}}"],
            "path": ["{{createdId}}"]
            }
        }
        },
        {
        "name": "GET Non-existent Male Measurement (404 test)",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 404', function () {",
                "    pm.response.to.have.status(404);",
                "});",
                "",
                "pm.test('Response has error message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('error', 'Measurement not found');",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "GET",
            "header": [],
            "url": {
            "raw": "{{baseUrl}}/999999",
            "host": ["{{baseUrl}}"],
            "path": ["999999"]
            }
        }
        },
        {
        "name": "POST Invalid Male Measurement (Validation Test)",
        "event": [
            {
            "listen": "test",
            "script": {
                "exec": [
                "pm.test('Status code is 500 (invalid data)', function () {",
                "    pm.response.to.have.status(500);",
                "});",
                "",
                "pm.test('Response has error message', function () {",
                "    var jsonData = pm.response.json();",
                "    pm.expect(jsonData).to.have.property('error');",
                "});"
                ],
                "type": "text/javascript"
            }
            }
        ],
        "request": {
            "method": "POST",
            "header": [
            {
                "key": "Content-Type",
                "value": "application/json"
            }
            ],
            "body": {
            "mode": "raw",
            "raw": "{\n  \"client_name\": \"Invalid User\"\n}"
            },
            "url": {
            "raw": "{{baseUrl}}",
            "host": ["{{baseUrl}}"]
            }
        }
        }
    ]
    }
]

**CODE 13 - File: measurement-male-database.sqlite**
[
    14	38	16.5	60	42	98	84	102	28	58	37	36	24	32	26	18	76	78	44	140	108	178	John Doe	M	2025-07-01	2026-05-07 05:20:40	2026-05-07 05:20:40
    15	40	17	62	44	104	90	108	30	62	39	38	25.5	34	28	19	79	81	46	144	112	182	Michael Smith	L	2025-07-05	2026-05-07 05:20:40	2026-05-07 05:20:40
    16	37	16	58	40	92	78	96	26	54	35	34	22.5	30	24.5	17	73	75	42	136	104	175	Robert Johnson	S	2025-07-10	2026-05-07 05:20:40	2026-05-07 05:20:40
    17	42	18	64	46	110	96	114	32	66	41	40	27	36	30	20	82	84	48	148	116	185	David Williams	XL	2025-07-15	2026-05-07 05:20:40	2026-05-07 05:20:40
    18	38	16.5	60	42	98	84	102	28	58	37	36	24	32	26	18	76	78	44	140	108	178	John Doe	M	2025-07-01	2026-05-07 05:21:39	2026-05-07 05:21:39

]

**ERROR/ISSUE:**
[
  none
]

**REQUEST:**
[
    1. create a comprehensive postman API test that will tests all routes in CODE 2 - File: measurement-male-routes.js 
    2. create a comprehensive postman API test that will tests all routes in CODE 5 - File: measurement-female-routes.js
    3. save the files in: backend/postman/measurment-API-test
    4. in  CODE 7 - File: package.json, retain the following:  
        [  "scripts": {
        "test": "mocha test/**/*.test.js",
        "test:female": "mocha test/measurement/female/measurement-female.test.js --timeout 5000",
        "test:male": "mocha test/measurement/male/measurement-male.test.js --timeout 5000"
         },
        ]
        
    5. provide instruction on how to use it
]