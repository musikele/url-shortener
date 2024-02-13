const { AsyncDatabase } = require('promised-sqlite3');

const db = await AsyncDatabase.open(':memory:');

await db.run(`CREATE TABLE urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    slug TEXT NOT NULL
    )`);

export async function saveUrl(url: string, slug: string) {
  return await db.run('INSERT INTO urls (url, slug) VALUES (?, ?)', [
    url,
    slug,
  ]);
}

export async function getUrl(slug: string) {
  return await db.get('SELECT url FROM urls WHERE slug = ?', [slug]);
}
