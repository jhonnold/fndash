const express = require('express');
const inputService = require('../services/input-service');

const router = express.Router();

router.get('/:id/stats', async (req, res) => {
    const { id } = req.params;
    const { mode } = req.query;

    const stats = await inputService.getInputStats({ id, mode });

    return res.json(stats);
});

router.get('/:id/daily-stats', async (req, res) => {
    const { id } = req.params;
    const { mode } = req.query;

    const dailyStats = await inputService.getDailyStats({ id, mode });

    return res.json(dailyStats);
});

router.get('/:id/placements', async (req, res) => {
    const { id } = req.params;
    const { mode } = req.query;

    const placements = await inputService.getInputPlacements({ id, mode });

    return res.json(placements);
});

module.exports = router;
