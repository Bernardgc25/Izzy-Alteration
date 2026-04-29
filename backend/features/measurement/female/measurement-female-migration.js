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