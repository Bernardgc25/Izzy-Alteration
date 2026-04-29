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