const path = require('path');
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const { logging } = require('./middleware');

const app = express();

app.use(logging);
app.use(cors());
app.use(bp.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/users', require('./routes/users'));
app.use('/api/games', require('./routes/games'));
app.use('/api/inputs', require('./routes/inputs'));

app.use('*', (_, res) => res.sendFile(path.join(__dirname, '../dist', 'index.html')));

module.exports = app;
