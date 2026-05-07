**CODE 1 - File: measurement-female-seeding.js**  
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


**CODE 3 - File: README.md**   
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
  │  │        ├─ measurement-male-routes.js
  │  │        └─ measurement-male-seeding.js
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
  1. create a filename: measurement-male-seeding.js
  2. create a JavaScript file with the same structure and functionality as measurement-female-seeding.js, but for the male measurements. The file should be located in the backend/features/measurement/male/ directory 
  3. The script should seed the MaleMeasurement table from CODE 2 with at least 4 sample records, similar to the structure of the sampleMeasurements array in measurement-female-seeding.js, but with appropriate fields for the male measurements as defined in the MaleMeasurement table.
  4. Ensure that the script connects to the correct SQLite database (measurement-male-database.sqlite) and inserts the sample data into the MaleMeasurement table.
  5. Include console logs to indicate the progress of the seeding process, such as when the seeding starts, each record insertion, and when the seeding is complete.
  6. Handle any potential errors during database operations and log them appropriately.
  7. Close the database connection after the seeding process is complete, with error handling for the close operation as well.
  8. Provide instructions in the comments at the top of the file on how to run the seeding script from the command line.
]