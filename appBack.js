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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Routes
app.route('/kanban/cards')
  .get((req, res) => {
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
  })
  .post((req, res) => {
    const assignedNames = req.body.assigned_to.split(',').map((user) => {
      let cleanUser = user.replace(/[^A-Za-z0-9]/g, '');
      return cleanUser.trim();
    });
    // Card.create()
  });



module.exports = app;