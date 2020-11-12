const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Ismile');
});

module.exports = app;
