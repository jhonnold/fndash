const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (_, res) => {
    const users = await db.User.findAll();

    return res.json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await db.User.findByPk(id, {
        include: {
            model: db.Input,
            as: 'inputs',
            include: 'stats',
        },
    });
    if (!user) return res.sendStatus(404);

    return res.json(user);
});

module.exports = router;
