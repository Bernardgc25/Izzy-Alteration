// seed-measurement-male.js
// Usage: node seed-measurement-male.js
// Populates measurement-male-test.sqlite with sample data.

const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'measurement-male-test.sqlite');
const db = new sqlite3.Database(dbPath);

// Ensure the table exists (same schema as in migration)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS MaleMeasurement (
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
    )
  `);

  // Sample data – 5 varied records
  const sampleData = [
    {
      neck: 38.5, shoulder_length: 45.0, arm_length: 62.0, across_front: 42.0,
      chest_circumference: 98.0, waist: 82.0, hip_circumference: 96.0, total_rise: 28.0,
      thigh: 56.0, knee: 38.0, calf: 36.0, ankle: 24.0, bicep: 32.0, elbow: 28.0,
      wrist: 18.0, inseam_ankle: 72.0, inseam_floor: 100.0, neck_waist: 45.0,
      neck_floor: 140.0, waist_floor: 105.0, height: 175.0, client_name: 'John Doe',
      size_number: 'M', measurement_date: '2025-02-20'
    },
    {
      neck: 40.0, shoulder_length: 46.5, arm_length: 64.0, across_front: 43.5,
      chest_circumference: 104.0, waist: 88.0, hip_circumference: 102.0, total_rise: 29.5,
      thigh: 58.5, knee: 40.0, calf: 37.5, ankle: 25.0, bicep: 34.0, elbow: 29.5,
      wrist: 19.0, inseam_ankle: 76.0, inseam_floor: 105.0, neck_waist: 47.0,
      neck_floor: 148.0, waist_floor: 110.0, height: 182.0, client_name: 'Mike Smith',
      size_number: 'L', measurement_date: '2025-03-01'
    },
    {
      neck: 36.0, shoulder_length: 43.0, arm_length: 60.0, across_front: 40.0,
      chest_circumference: 92.0, waist: 76.0, hip_circumference: 90.0, total_rise: 27.0,
      thigh: 53.0, knee: 36.0, calf: 34.0, ankle: 22.5, bicep: 30.0, elbow: 26.5,
      wrist: 17.0, inseam_ankle: 70.0, inseam_floor: 97.0, neck_waist: 43.0,
      neck_floor: 135.0, waist_floor: 100.0, height: 168.0, client_name: 'Alex Brown',
      size_number: 'S', measurement_date: '2025-04-10'
    },
    {
      neck: 42.0, shoulder_length: 48.0, arm_length: 66.0, across_front: 46.0,
      chest_circumference: 110.0, waist: 94.0, hip_circumference: 108.0, total_rise: 31.0,
      thigh: 62.0, knee: 42.0, calf: 39.0, ankle: 26.0, bicep: 36.0, elbow: 31.0,
      wrist: 20.0, inseam_ankle: 78.0, inseam_floor: 108.0, neck_waist: 50.0,
      neck_floor: 155.0, waist_floor: 115.0, height: 185.0, client_name: 'David Lee',
      size_number: 'XL', measurement_date: '2025-05-15'
    },
    {
      neck: 37.0, shoulder_length: 44.0, arm_length: 61.5, across_front: 41.0,
      chest_circumference: 95.0, waist: 80.0, hip_circumference: 93.0, total_rise: 27.5,
      thigh: 54.5, knee: 37.0, calf: 35.0, ankle: 23.0, bicep: 31.0, elbow: 27.0,
      wrist: 17.5, inseam_ankle: 71.5, inseam_floor: 99.0, neck_waist: 44.0,
      neck_floor: 138.0, waist_floor: 102.0, height: 172.0, client_name: 'Chris Evans',
      size_number: 'M', measurement_date: '2025-06-01'
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO MaleMeasurement (
      neck, shoulder_length, arm_length, across_front, chest_circumference, waist,
      hip_circumference, total_rise, thigh, knee, calf, ankle, bicep, elbow, wrist,
      inseam_ankle, inseam_floor, neck_waist, neck_floor, waist_floor, height,
      client_name, size_number, measurement_date
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);

  sampleData.forEach(record => {
    stmt.run(
      record.neck, record.shoulder_length, record.arm_length, record.across_front,
      record.chest_circumference, record.waist, record.hip_circumference, record.total_rise,
      record.thigh, record.knee, record.calf, record.ankle, record.bicep, record.elbow,
      record.wrist, record.inseam_ankle, record.inseam_floor, record.neck_waist,
      record.neck_floor, record.waist_floor, record.height, record.client_name,
      record.size_number, record.measurement_date
    );
  });

  stmt.finalize(() => {
    console.log('Seed data inserted successfully.');
    db.close();
  });
});