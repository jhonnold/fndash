const express = require('express');
const gameService = require('../services/game-service');

const router = express.Router();

router.get('/', async (req, res) => {
    const { inputId, page } = req.query;
    if (!inputId) return res.sendStatus(400);

    const results = await gameService.getAllFor({ inputId, page });

    return res.json({
        page: page || 1,
        count: results.count,
        games: results.rows,
    });
});

router.get('/records', async (req, res) => {
    const { inputId } = req.query;
    if (!inputId) return res.sendStatus(400);

    const games = await gameService.getRecordsFor({ inputId });

    return res.json(games);
});

router.get('/recent', async (_, res) => {
    const games = await gameService.getRecent();

    return res.json(games);
});

module.exports = router;
