export function up(db) {
  db.exec(`
    CREATE TABLE users (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL
    )
  `);
}
