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