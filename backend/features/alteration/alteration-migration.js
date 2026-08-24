const sqlite3 = require('sqlite3');
const path = require('path');

function runSql(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

async function runMigration(dbPath) {
  const db = new sqlite3.Database(dbPath);

  try {
    await runSql(db, `
      CREATE TABLE IF NOT EXISTS AlterationItem (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        service_key TEXT NOT NULL UNIQUE,
        label TEXT NOT NULL,
        description TEXT,
        simple_price REAL NOT NULL DEFAULT 0,
        intermediate_price REAL NOT NULL DEFAULT 0,
        difficult_price REAL NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ AlterationItem table ready.');

    for (const field of ['category', 'service_key']) {
      await runSql(
        db,
        `CREATE INDEX IF NOT EXISTS idx_alterationitem_${field} ON AlterationItem(${field})`
      );
      console.log(`✅ Index idx_alterationitem_${field} created.`);
    }

    await runSql(db, `
      CREATE TRIGGER IF NOT EXISTS update_alterationitem_timestamp
      AFTER UPDATE ON AlterationItem
      BEGIN
        UPDATE AlterationItem
        SET updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.id;
      END
    `);
    console.log('✅ Trigger update_alterationitem_timestamp created.');
  } finally {
    await new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('🔒 Database connection closed.');
  }
}

const defaultDbPath = process.env.TEST_DATABASE_ALTERATION ||
  path.resolve(__dirname, 'alteration-database.sqlite');

if (require.main === module) {
  runMigration(defaultDbPath)
    .then(() => {
      console.log('🎉 Migration complete.');
    })
    .catch((err) => {
      console.error('❌ Migration failed:', err.message);
      process.exit(1);
    });
}

module.exports = { runMigration };