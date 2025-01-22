const db = require('../db/database');

function registerUser(email, username, password, callback) {
    const query = `INSERT INTO users (email, username, password) VALUES (?, ?, ?)`;
    db.run(query, [email, username, password], function (err) {
        if (err) {
            callback(err);
        } else {
            callback(null, { id: this.lastID, email, username });
        }
    });
}

function checkUsernameAvailability(username, callback) {
    const query = `SELECT COUNT(*) as count FROM users WHERE username = ?`;
    db.get(query, [username], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row.count === 0);
        }
    });
}

function loginUser(email, callback) {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    });
}

function getUserById(id, callback) {
    const query = `SELECT * FROM users WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row);
        }
    });
}

module.exports = {
    registerUser,
    checkUsernameAvailability,
    loginUser,
    getUserById
};
