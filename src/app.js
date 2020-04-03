const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const { logging } = require('./middleware');

const app = express();

app.use(logging);
app.use(cors());
app.use(bp.json());

app.get('/', (_, res) => {
    res.send('<h1>Hello</h1>');
});

module.exports = app;
