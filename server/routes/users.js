const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (_, res) => {
    const users = await db.user.findAll();

    return res.json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const user = await db.user.findByPk(id, {
        include: {
            model: db.input,
            include: db.stat,
        },
    });
    if (!user) return res.sendStatus(404);

    return res.json(user);
});

module.exports = router;
