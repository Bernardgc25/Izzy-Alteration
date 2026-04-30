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