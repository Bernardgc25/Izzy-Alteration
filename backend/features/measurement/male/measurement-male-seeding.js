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