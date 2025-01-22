const scoreService = require('../services/scoreServices');

function addScore(req, res) {
    const { winner_name, opponent_name, status_of_match, time } = req.body;
    scoreService.addScore(winner_name, opponent_name, status_of_match, time, (err) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.status(201).send({ message: 'Score added successfully' });
    });
}

function getScores(req, res) {
    const userId = req.params.userId;
    scoreService.getScores(userId, (err, scores) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        res.status(200).send(scores);
    });
}

module.exports = {
    addScore,
    getScores
};
