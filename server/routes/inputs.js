const express = require('express');
const inputService = require('../services/input-service');

const router = express.Router();

router.get('/:id/stats', async (req, res) => {
    const { id } = req.params;

    const stats = await inputService.getInputStats({ id });

    return res.json(stats);
});

router.get('/:id/daily-stats', async (req, res) => {
    const { id } = req.params;

    const dailyStats = await inputService.getDailyStats({ id });

    return res.json(dailyStats);
});

module.exports = router;
