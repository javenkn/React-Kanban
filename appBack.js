// Requires
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const db = require('./models');
const User = db.User;
const Card = db.Card;
const user_card = db.user_card;

Card.findAll({
  include: [
    {
      model: User,
      required: true
    }
  ]
})
.then((cards) => {
  cards.forEach((card) => {
    console.log(card.dataValues);
    card.dataValues.Users.forEach((user) => {
      console.log(user.dataValues);
    });
  });
});


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