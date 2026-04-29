// =============================================================================
// measurement-female-seed.js
// =============================================================================
// Seeds the test database (measurement-female-test.sqlite) with sample data.
// Every time this script is run it inserts new records – it does NOT check
// whether the table already contains data, so repeated runs will add more rows.
//
// HOW TO RUN:
//  1. From the project root, go to backend directory and execute:
//       node test/measurement/female/measurement-female-seed.js
//  2. go to DB Browser and open the measurement-female-seed-test.sqlite file to verify the inserted data.
// =============================================================================

const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'measurement-female-seed-test.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Ensure the table exists
  db.run(`
    CREATE TABLE IF NOT EXISTS FemaleMeasurement (
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
    )
  `);

  // Sample female measurement data – inserted on every run
  const sampleData = [
    {
      neck: 32.5, shoulder_length: 38.0, arm_length: 58.0, chest_circumference: 86.0,
      under_bust: 74.0, waist: 68.0, hipbone_circumference: 88.0, hip_circumference: 94.0,
      thigh: 54.0, knee: 34.0, calf: 32.0, ankle: 21.0, bicep: 28.0, elbow: 24.0,
      wrist: 15.5, inseam_ankle: 70.0, inseam_floor: 98.0, neck_waist: 42.0,
      neck_floor: 135.0, waist_floor: 102.0, height: 162.0, client_name: 'Emma Johnson',
      size_number: 'S', measurement_date: '2025-01-15'
    },
    {
      neck: 34.0, shoulder_length: 40.0, arm_length: 60.0, chest_circumference: 92.0,
      under_bust: 80.0, waist: 74.0, hipbone_circumference: 94.0, hip_circumference: 100.0,
      thigh: 58.0, knee: 36.0, calf: 34.0, ankle: 22.0, bicep: 30.0, elbow: 26.0,
      wrist: 16.0, inseam_ankle: 72.0, inseam_floor: 100.0, neck_waist: 44.0,
      neck_floor: 140.0, waist_floor: 105.0, height: 168.0, client_name: 'Sophia Martinez',
      size_number: 'M', measurement_date: '2025-02-20'
    },
    {
      neck: 36.0, shoulder_length: 42.0, arm_length: 62.0, chest_circumference: 98.0,
      under_bust: 86.0, waist: 80.0, hipbone_circumference: 100.0, hip_circumference: 106.0,
      thigh: 62.0, knee: 38.0, calf: 36.0, ankle: 23.0, bicep: 32.0, elbow: 28.0,
      wrist: 17.0, inseam_ankle: 74.0, inseam_floor: 103.0, neck_waist: 46.0,
      neck_floor: 145.0, waist_floor: 108.0, height: 172.0, client_name: 'Olivia Williams',
      size_number: 'L', measurement_date: '2025-03-10'
    },
    {
      neck: 37.5, shoulder_length: 44.0, arm_length: 64.0, chest_circumference: 104.0,
      under_bust: 92.0, waist: 86.0, hipbone_circumference: 106.0, hip_circumference: 112.0,
      thigh: 66.0, knee: 40.0, calf: 38.0, ankle: 24.0, bicep: 34.0, elbow: 30.0,
      wrist: 18.0, inseam_ankle: 76.0, inseam_floor: 106.0, neck_waist: 48.0,
      neck_floor: 150.0, waist_floor: 112.0, height: 178.0, client_name: 'Ava Brown',
      size_number: 'XL', measurement_date: '2025-04-05'
    },
    {
      neck: 33.0, shoulder_length: 39.0, arm_length: 59.0, chest_circumference: 89.0,
      under_bust: 77.0, waist: 71.0, hipbone_circumference: 91.0, hip_circumference: 97.0,
      thigh: 56.0, knee: 35.0, calf: 33.0, ankle: 21.5, bicep: 29.0, elbow: 25.0,
      wrist: 15.5, inseam_ankle: 71.0, inseam_floor: 99.0, neck_waist: 43.0,
      neck_floor: 138.0, waist_floor: 104.0, height: 165.0, client_name: 'Isabella Garcia',
      size_number: 'M', measurement_date: '2025-05-22'
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO FemaleMeasurement (
      neck, shoulder_length, arm_length, chest_circumference, under_bust, waist,
      hipbone_circumference, hip_circumference, thigh, knee, calf, ankle, bicep,
      elbow, wrist, inseam_ankle, inseam_floor, neck_waist, neck_floor, waist_floor,
      height, client_name, size_number, measurement_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const record of sampleData) {
    stmt.run(
      record.neck, record.shoulder_length, record.arm_length, record.chest_circumference,
      record.under_bust, record.waist, record.hipbone_circumference, record.hip_circumference,
      record.thigh, record.knee, record.calf, record.ankle, record.bicep, record.elbow,
      record.wrist, record.inseam_ankle, record.inseam_floor, record.neck_waist,
      record.neck_floor, record.waist_floor, record.height, record.client_name,
      record.size_number, record.measurement_date
    );
  }

  stmt.finalize((err) => {
    if (err) {
      console.error('❌ Error inserting seed data:', err.message);
    } else {
      console.log(`✅ ${sampleData.length} female measurement records seeded successfully.`);
    }
    db.close();
  });
});