const express = require("express");
const fs = require("fs");
const path = require("path");
const initSqlJs = require("sql.js");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, "data", "favorites.sqlite");
let db;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function saveDatabase() {
  const data = db.export();
  fs.writeFileSync(DB_FILE, Buffer.from(data));
}
function getFavorites() {
  const result = db.exec("SELECT id, quote, author, saved_at FROM favorites ORDER BY saved_at DESC");
  if (!result.length) return [];
  return result[0].values.map(row => ({
    id: String(row[0]), quote: row[1], author: row[2], savedAt: row[3]
  }));
}

async function start() {
  const SQL = await initSqlJs({
    locateFile: file => path.join(path.dirname(require.resolve("sql.js")), file)
  });
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  db = fs.existsSync(DB_FILE)
    ? new SQL.Database(new Uint8Array(fs.readFileSync(DB_FILE)))
    : new SQL.Database();

  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    saved_at INTEGER NOT NULL,
    UNIQUE(quote, author)
  )`);
  saveDatabase();

  app.get("/api/quote", async (_req, res) => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Quote service unavailable");
      const data = await response.json();
      res.json({ id: data.id, quote: data.quote, author: data.author });
    } catch (_error) {
      res.status(502).json({ error: "Could not fetch a quote. Please try again." });
    }
  });

  app.get("/api/favorites", (_req, res) => res.json(getFavorites()));

  app.post("/api/favorites", (req, res) => {
    const quote = String(req.body.quote || "").trim();
    const author = String(req.body.author || "Unknown").trim();
    if (!quote) return res.status(400).json({ error: "Quote is required." });
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
    try {
      db.run("INSERT INTO favorites (id, quote, author, saved_at) VALUES (?, ?, ?, ?)",
        [id, quote, author, Date.now()]);
      saveDatabase();
      res.status(201).json({ id, quote, author, savedAt: Date.now() });
    } catch (_error) {
      res.status(409).json({ error: "This quote is already in your favorites." });
    }
  });

  app.delete("/api/favorites/:id", (req, res) => {
    const before = getFavorites().length;
    db.run("DELETE FROM favorites WHERE id = ?", [req.params.id]);
    if (getFavorites().length === before) return res.status(404).json({ error: "Favorite not found." });
    saveDatabase();
    res.json({ message: "Favorite removed." });
  });

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.listen(PORT, () => console.log(`Quote Generator running on port ${PORT}`));
}

start().catch(error => {
  console.error("Could not start the application:", error);
  process.exit(1);
});