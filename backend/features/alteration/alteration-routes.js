const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = process.env.TEST_DATABASE_ALTERATION ||
  path.resolve(__dirname, 'alteration-database.sqlite');

const db = new sqlite3.Database(dbPath);
const alterationRouter = express.Router();

const requiredFields = [
  'category',
  'service_key',
  'label',
  'simple_price',
  'intermediate_price',
  'difficult_price'
];

function validateAlteration(body) {
  const errors = [];

  requiredFields.forEach(field => {
    const value = body[field];
    if (value === undefined || value === null || value === '') {
      errors.push(`${field} is required`);
    }
  });

  ['simple_price', 'intermediate_price', 'difficult_price'].forEach(field => {
    const value = body[field];
    if (value !== undefined && value !== '' && isNaN(Number(value))) {
      errors.push(`${field} must be a number`);
    }
  });

  return errors;
}

// GET /api/alterations
// Optional query params:
//   category=female-dress
//   service_key=female-top-hem-unlined
//   search=hem
alterationRouter.get('/', (req, res) => {
  const { category, service_key, search } = req.query;

  let sql = 'SELECT * FROM AlterationItem';
  const params = [];
  const conditions = [];

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  if (service_key) {
    conditions.push('service_key = ?');
    params.push(service_key);
  }

  if (search) {
    conditions.push('(service_key LIKE ? OR label LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY id';

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/alterations/map
// Returns nested map matching the frontend alteration-DataMaps.js shape:
// {
//   "female-bottom": {
//     "female-bottom-hem-skirt-straight-slim": {
//       simple: 33,
//       intermediate: 44,
//       difficult: 55,
//       detail: "..."
//     }
//   }
// }
alterationRouter.get('/map', (req, res) => {
  db.all('SELECT * FROM AlterationItem ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const grouped = {};

    rows.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = {};
      }

      grouped[item.category][item.service_key] = {
        simple: item.simple_price,
        intermediate: item.intermediate_price,
        difficult: item.difficult_price,
        detail: item.description
      };
    });

    res.json(grouped);
  });
});

// GET /api/alterations/category/:category
alterationRouter.get('/category/:category', (req, res) => {
  const category = req.params.category;

  db.all(
    'SELECT * FROM AlterationItem WHERE category = ? ORDER BY id',
    [category],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// GET /api/alterations/:id
alterationRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid alteration id' });
  }

  db.get('SELECT * FROM AlterationItem WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Alteration not found' });
    res.json(row);
  });
});

// POST /api/alterations
alterationRouter.post('/', (req, res) => {
  const errors = validateAlteration(req.body);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const {
    category,
    service_key,
    label,
    description = '',
    simple_price,
    intermediate_price,
    difficult_price
  } = req.body;

  const sql = `
    INSERT INTO AlterationItem (
      category,
      service_key,
      label,
      description,
      simple_price,
      intermediate_price,
      difficult_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    category,
    service_key,
    label,
    description,
    Number(simple_price),
    Number(intermediate_price),
    Number(difficult_price)
  ];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'service_key already exists' });
      }
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ id: this.lastID });
  });
});

// PUT /api/alterations/:id
alterationRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid alteration id' });
  }

  const errors = validateAlteration(req.body);

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  const {
    category,
    service_key,
    label,
    description = '',
    simple_price,
    intermediate_price,
    difficult_price
  } = req.body;

  const sql = `
    UPDATE AlterationItem
    SET category = ?,
        service_key = ?,
        label = ?,
        description = ?,
        simple_price = ?,
        intermediate_price = ?,
        difficult_price = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const params = [
    category,
    service_key,
    label,
    description,
    Number(simple_price),
    Number(intermediate_price),
    Number(difficult_price),
    id
  ];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'service_key already exists' });
      }
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Alteration not found' });
    }

    res.json({ message: 'Alteration updated successfully' });
  });
});

// DELETE /api/alterations/:id
alterationRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid alteration id' });
  }

  db.run('DELETE FROM AlterationItem WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Alteration not found' });
    }

    res.json({ message: 'Alteration deleted successfully' });
  });
});

module.exports = alterationRouter;