import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || 'data/data.db';
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export async function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  const dir = path.join(__dirname, '../migrations');
  if (!fs.existsSync(dir)) return;

  const applied = new Set(
    db.prepare('SELECT name FROM migrations').all().map((r) => r.name)
  );

  const files = fs
    .readdirSync(dir)
    .filter((f) => /^\d+-.+\.js$/.test(f))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;

    const mod = await import(pathToFileURL(path.join(dir, file)).href);
    const run = db.transaction(() => {
      mod.up(db);
      db.prepare('INSERT INTO migrations (name) VALUES (?)').run(file);
    });
    run();
    console.log(`migrated: ${file}`);
  }
}

export default db;
