// Requires
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Sanity check');
});

module.exports = app;