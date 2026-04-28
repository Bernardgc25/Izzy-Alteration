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