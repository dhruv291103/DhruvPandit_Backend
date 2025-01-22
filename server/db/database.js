const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('game.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)`);

// Create Scores table
db.run(`CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    winner_name TEXT,
    opponent_name TEXT,
    status_of_match TEXT,
    time TEXT,
    FOREIGN KEY (winner_name) REFERENCES users(id),
    FOREIGN KEY (opponent_name) REFERENCES users(id)
)`);

module.exports = db;
