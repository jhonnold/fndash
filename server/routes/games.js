const express = require('express');
const gameService = require('../services/game-service');

const router = express.Router();

router.get('/', async (req, res) => {
    const { inputId, page, mode } = req.query;
    if (!inputId) return res.sendStatus(400);

    const results = await gameService.getAllFor({ inputId, mode, page });

    return res.json({
        page: page || 1,
        count: results.count,
        games: results.rows,
    });
});

router.get('/records', async (req, res) => {
    const { inputId, mode } = req.query;
    if (!inputId) return res.sendStatus(400);

    const games = await gameService.getRecordsFor({ inputId, mode });

    return res.json(games);
});

router.get('/recent', async (_, res) => {
    const games = await gameService.getRecent();

    return res.json(games);
});

module.exports = router;
