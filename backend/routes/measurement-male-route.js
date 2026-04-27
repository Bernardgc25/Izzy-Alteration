const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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
    neck,
    shoulder_length,
    arm_length,
    across_front,
    chest_circumference,
    waist,
    hip_circumference,
    total_rise,
    thigh,
    knee,
    calf,
    ankle,
    bicep,
    elbow,
    wrist,
    inseam_ankle,
    inseam_floor,
    neck_waist,
    neck_floor,
    waist_floor,
    height,
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