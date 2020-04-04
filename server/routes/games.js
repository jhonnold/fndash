const express = require('express');
const { Op } = require('sequelize');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    const { inputId } = req.query;
    if (!inputId) return res.sendStatus(400);

    const games = await db.Game.findAll({
        order: [['timePlayed', 'DESC']],
        include: {
            required: true,
            model: db.Stat,
            as: 'stat',
            include: {
                required: true,
                model: db.Input,
                as: 'input',
                where: {
                    id: inputId,
                },
                include: 'user',
            },
        },
    });

    return res.json(games);
});

router.get('/active', async (_, res) => {
    const mostRecentGames = await db.Game.findAll({
        attributes: [[db.sequelize.fn('max', db.sequelize.col('Game.id')), 'id']],
        group: [db.sequelize.col('stat.input.user_id')],
        where: { timePlayed: { [Op.gt]: new Date('2019-08-24 21:45:00.000') } },
        include: {
            required: true,
            model: db.Stat,
            attributes: [],
            as: 'stat',
            include: {
                required: true,
                model: db.Input,
                attributes: [],
                as: 'input',
            },
        },
    });

    const games = await db.Game.findAll({
        where: { id: { [Op.in]: mostRecentGames.map(g => g.id) } },
        order: [['timePlayed', 'DESC']],
        include: {
            required: true,
            model: db.Stat,
            as: 'stat',
            include: {
                required: true,
                model: db.Input,
                as: 'input',
                include: {
                    required: true,
                    model: db.User,
                    as: 'user',
                },
            },
        },
    });

    return res.json(games);
});

module.exports = router;
