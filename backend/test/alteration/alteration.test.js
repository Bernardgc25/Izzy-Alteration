// =============================================================================
// File: backend/test/alteration/alteration.test.js
// HOW TO RUN:
//   From the backend directory:
//       npm run test:alteration
//
//   Or directly:
//       npx mocha test/alteration/alteration.test.js --timeout 5000
// =============================================================================

const request = require('supertest');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const express = require('express');

const TEST_DB_FILE = path.join(__dirname, 'alteration-seed-test.sqlite');

describe('Alteration (Routes + Migration)', function () {
  let app;
  let testDb;
  let originalTestDatabase;

  before(async function () {
    originalTestDatabase = process.env.TEST_DATABASE_ALTERATION;

    // Use isolated test database for both migration and routes
    process.env.TEST_DATABASE_ALTERATION = TEST_DB_FILE;

    if (fs.existsSync(TEST_DB_FILE)) {
      fs.unlinkSync(TEST_DB_FILE);
    }

    // Run the real migration module against the temporary test database
    const { runMigration } = require('../../features/alteration/alteration-migration');
    await runMigration(TEST_DB_FILE);

    // Ensure the API and route modules use the test database after any previous requires
    delete require.cache[require.resolve('../../api')];
    delete require.cache[require.resolve('../../features/alteration/alteration-routes')];

    const apiRouter = require('../../api');
    app = express();
    app.use(express.json());
    app.use('/api', apiRouter);

    testDb = new sqlite3.Database(TEST_DB_FILE);
  });

  after(async function () {
    if (testDb) {
      await new Promise(resolve => testDb.close(resolve));
    }

    if (fs.existsSync(TEST_DB_FILE)) {
      fs.unlinkSync(TEST_DB_FILE);
    }

    if (originalTestDatabase !== undefined) {
      process.env.TEST_DATABASE_ALTERATION = originalTestDatabase;
    } else {
      delete process.env.TEST_DATABASE_ALTERATION;
    }
  });

  function runTestDb(sql, params = []) {
    return new Promise((resolve, reject) => {
      testDb.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve(this);
      });
    });
  }

  function getTestDb(sql, params = []) {
    return new Promise((resolve, reject) => {
      testDb.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }

  function allTestDb(sql, params = []) {
    return new Promise((resolve, reject) => {
      testDb.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  // ---------------------------------------------------------------------------
  // Migration Schema Tests
  // ---------------------------------------------------------------------------
  describe('Database Schema (migration)', function () {
    it('should have the AlterationItem table', async function () {
      const row = await getTestDb(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='AlterationItem'"
      );
      expect(row).to.not.be.undefined;
    });

    it('should have all required columns with expected names', async function () {
      const columns = await allTestDb("PRAGMA table_info('AlterationItem')");
      const colNames = columns.map(c => c.name);
      const expected = [
        'id',
        'category',
        'service_key',
        'label',
        'description',
        'simple_price',
        'intermediate_price',
        'difficult_price',
        'created_at',
        'updated_at'
      ];
      expect(colNames).to.have.members(expected);
    });

    it('should have indexes on category and service_key', async function () {
      const indexes = await allTestDb(
        "SELECT name FROM sqlite_master WHERE type='index' AND tbl_name='AlterationItem'"
      );
      const names = indexes.map(i => i.name);
      expect(names).to.include.members([
        'idx_alterationitem_category',
        'idx_alterationitem_service_key'
      ]);
    });

    it('should fire trigger and update updated_at on UPDATE', async function () {
      const insert = await runTestDb(
        `INSERT INTO AlterationItem
          (category, service_key, label, simple_price, intermediate_price, difficult_price)
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['test-category', 'trigger-test-key', 'Trigger Test', 10, 20, 30]
      );
      const id = insert.lastID;

      const initialRow = await getTestDb(
        'SELECT created_at, updated_at FROM AlterationItem WHERE id = ?',
        [id]
      );
      const initialUpdated = initialRow.updated_at;

      await new Promise(resolve => setTimeout(resolve, 1500));

      await runTestDb(
        'UPDATE AlterationItem SET label = ? WHERE id = ?',
        ['Trigger Updated', id]
      );

      const updatedRow = await getTestDb(
        'SELECT updated_at FROM AlterationItem WHERE id = ?',
        [id]
      );

      expect(updatedRow.updated_at).to.not.equal(initialUpdated);

      await runTestDb('DELETE FROM AlterationItem WHERE id = ?', [id]);
    });
  });

  // ---------------------------------------------------------------------------
  // API Route Tests (CRUD + query + map)
  // ---------------------------------------------------------------------------
  describe('API /api/alterations', function () {
    beforeEach(async function () {
      await runTestDb('DELETE FROM AlterationItem');
    });

    async function insertSample(bodyOverride = {}) {
      const defaultBody = {
        category: 'female-dress',
        service_key: 'female-dress-hem-test',
        label: 'Dress Hem',
        description: 'Shorten/lengthen dress hem',
        simple_price: 25,
        intermediate_price: 40,
        difficult_price: 55
      };
      const body = { ...defaultBody, ...bodyOverride };
      const res = await request(app)
        .post('/api/alterations')
        .send(body)
        .expect(201);
      return res.body.id;
    }

    describe('GET /', function () {
      it('should return an empty array when no alterations exist', async function () {
        const res = await request(app).get('/api/alterations');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.is.empty;
      });

      it('should return all inserted records', async function () {
        await insertSample({ service_key: 'female-dress-hem-alice', label: 'Alice Hem' });
        await insertSample({ service_key: 'female-dress-hem-bob', label: 'Bob Hem' });
        const res = await request(app).get('/api/alterations');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf(2);
        const labels = res.body.map(r => r.label);
        expect(labels).to.have.members(['Alice Hem', 'Bob Hem']);
      });

      it('should filter by search query on service_key, label, or description', async function () {
        await insertSample({
          service_key: 'male-suit-sleeve-shorten',
          label: 'Sleeve Shorten',
          description: 'Shorten jacket sleeves'
        });
        await insertSample({
          service_key: 'female-dress-hem-test',
          label: 'Dress Hem',
          description: 'Dress hem only'
        });

        const res = await request(app).get('/api/alterations?search=sleeve');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].service_key).to.equal('male-suit-sleeve-shorten');
      });
    });

    describe('GET /map', function () {
      it('should return nested map grouped by category and service_key', async function () {
        await insertSample({
          category: 'female-bottom',
          service_key: 'female-bottom-hem-skirt',
          label: 'Skirt Hem',
          description: 'Skirt hem only',
          simple_price: 12,
          intermediate_price: 18,
          difficult_price: 24
        });

        const res = await request(app).get('/api/alterations/map');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('female-bottom');
        expect(res.body['female-bottom']).to.have.property('female-bottom-hem-skirt');
        expect(res.body['female-bottom']['female-bottom-hem-skirt']).to.include({
          simple: 12,
          intermediate: 18,
          difficult: 24,
          detail: 'Skirt hem only'
        });
      });
    });

    describe('GET /category/:category', function () {
      it('should return only alterations for the given category', async function () {
        await insertSample({ category: 'female-top', service_key: 'female-top-hem-a' });
        await insertSample({ category: 'female-bottom', service_key: 'female-bottom-hem-b' });

        const res = await request(app).get('/api/alterations/category/female-top');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].category).to.equal('female-top');
      });
    });

    describe('GET /:id', function () {
      it('should return a single alteration for a valid ID', async function () {
        const id = await insertSample({ service_key: 'female-dress-hem-single', label: 'Single' });
        const res = await request(app).get(`/api/alterations/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.include({
          id,
          service_key: 'female-dress-hem-single',
          label: 'Single'
        });
      });

      it('should return 400 for a non-numeric ID', async function () {
        const res = await request(app).get('/api/alterations/abc');
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'Invalid alteration id');
      });

      it('should return 404 for a non-existent ID', async function () {
        const res = await request(app).get('/api/alterations/99999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Alteration not found');
      });
    });

    describe('POST /', function () {
      it('should create an alteration and return its ID', async function () {
        const res = await request(app)
          .post('/api/alterations')
          .send({
            category: 'male-top',
            service_key: 'male-top-shirt-hem',
            label: 'Shirt Hem',
            description: 'Casual shirt hem',
            simple_price: 15,
            intermediate_price: 22,
            difficult_price: 30
          });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id').that.is.a('number');
      });

      it('should return 400 with errors when required fields are missing', async function () {
        const res = await request(app)
          .post('/api/alterations')
          .send({ category: 'female-dress' });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('errors').that.is.an('array');
        expect(res.body.errors.join(',')).to.include('service_key is required');
      });

      it('should return 400 when price fields are not numbers', async function () {
        const res = await request(app)
          .post('/api/alterations')
          .send({
            category: 'female-dress',
            service_key: 'female-dress-bad-price',
            label: 'Bad Price',
            description: '',
            simple_price: 'abc',
            intermediate_price: 10,
            difficult_price: 10
          });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('errors').that.is.an('array');
      });

      it('should return 409 when service_key already exists', async function () {
        await insertSample({ service_key: 'duplicate-key' });
        const res = await request(app)
          .post('/api/alterations')
          .send({
            category: 'female-dress',
            service_key: 'duplicate-key',
            label: 'Duplicate',
            simple_price: 1,
            intermediate_price: 2,
            difficult_price: 3
          });
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('error', 'service_key already exists');
      });
    });

    describe('PUT /:id', function () {
      it('should update an existing alteration and return success', async function () {
        const id = await insertSample({ service_key: 'update-me' });
        const res = await request(app)
          .put(`/api/alterations/${id}`)
          .send({
            category: 'female-dress',
            service_key: 'update-me-new',
            label: 'Updated Label',
            description: 'Updated description',
            simple_price: 30,
            intermediate_price: 45,
            difficult_price: 60
          });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Alteration updated successfully');

        const getRes = await request(app).get(`/api/alterations/${id}`);
        expect(getRes.body.label).to.equal('Updated Label');
        expect(getRes.body.service_key).to.equal('update-me-new');
        expect(getRes.body.simple_price).to.equal(30);
      });

      it('should return 400 when required fields are missing in update', async function () {
        const id = await insertSample({ service_key: 'update-missing' });
        const res = await request(app)
          .put(`/api/alterations/${id}`)
          .send({ category: 'female-dress' });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('errors');
      });

      it('should return 404 when ID does not exist', async function () {
        const res = await request(app)
          .put('/api/alterations/99999')
          .send({
            category: 'female-dress',
            service_key: 'ghost',
            label: 'Ghost',
            simple_price: 1,
            intermediate_price: 2,
            difficult_price: 3
          });
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Alteration not found');
      });
    });

    describe('DELETE /:id', function () {
      it('should delete an alteration and return success', async function () {
        const id = await insertSample({ service_key: 'delete-me' });
        const res = await request(app).delete(`/api/alterations/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Alteration deleted successfully');

        const getRes = await request(app).get(`/api/alterations/${id}`);
        expect(getRes.status).to.equal(404);
      });

      it('should return 404 when deleting a non-existent ID', async function () {
        const res = await request(app).delete('/api/alterations/99999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('error', 'Alteration not found');
      });
    });
  });
});