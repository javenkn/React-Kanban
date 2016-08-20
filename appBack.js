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
      let properUser = cleanUser.properName();
      return properUser.trim();
    });
    console.log(assignedNames);
    User.findAll({
      where: {
        first_name: assignedNames
      }
    })
    .then((users) => {
      users.forEach((user) => {
        console.log(user.id);
      });
    });
    // Card.create()
  });

String.prototype.properName = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = app;