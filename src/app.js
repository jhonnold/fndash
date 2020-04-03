const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const { logging } = require('./middleware');

const app = express();

app.use(logging);
app.use(cors());
app.use(bp.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/games', require('./routes/games'));

module.exports = app;
