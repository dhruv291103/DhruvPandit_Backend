const db = require('../db/database');

function addScore(winner_name, opponent_name, status_of_match, time, callback) {
    const query = `INSERT INTO games (winner_name, opponent_name, status_of_match, time) VALUES (?, ?, ?, ?)`;

    console.log("Inserting score with data:", winner_name, opponent_name, status_of_match, time);

    db.run(query, [winner_name, opponent_name, status_of_match, time], function(err) {
        if (err) {
            console.error("Error inserting score:", err.message);
            return callback(err);
        }
        console.log("Score inserted with ID:", this.lastID);
        callback(null);
    });
}

function getScores(userId, callback) {
    const query = `SELECT * FROM scores WHERE user_id = ? OR opponent_id = ? ORDER BY game_date DESC`;
    db.all(query, [userId, userId], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
}

module.exports = {
    addScore,
    getScores
};
