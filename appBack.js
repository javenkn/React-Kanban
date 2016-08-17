// Requires
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const db = require('./models');
const User = db.User;
const Card = db.Card;
const user_card = db.user_card;



// Middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.get('/kanban/cards', (req, res) => {
  Card.findAll({
    include: [
      {
        model: User,
        required: true
      }
    ]
  })
  .then((cards) => {
    res.json(cards);
  });
});

module.exports = app;