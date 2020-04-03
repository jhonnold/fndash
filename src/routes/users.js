const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (_, res) => {
    const users = await db.User.findAll();

    return res.json(users);
});

module.exports = router;
