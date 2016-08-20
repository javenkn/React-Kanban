// Requires
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

require('./lib/string'); // custom string function
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
    const title = req.body.title.properName(); // makes the title proper
    const created_by = req.body.created_by.properName(); // makes the created by user proper
    const assignedNames = req.body.assigned_to.split(',').map((user) => {
      let cleanUser = user.replace(/[^A-Za-z0-9]/g, '');
      let properUser = cleanUser.properName();
      return properUser;
    });
    User.findAll({ // find all of the users that are assigned to the created card
      where: {
        first_name: assignedNames
      }
    })
    .then((users) => {
      if(users.length === assignedNames.length) {
        Card.create({ title: title, priority: req.body.priority, created_by: created_by, assigned_to: assignedNames.join(', ') })
        .then((card) => {
          users.forEach((user) => { // for each assigned user create a user_card
            user_card.create({ user_id: user.id, card_id: card.id });
          });
        });
      } else {
        console.log('Cannot find all users that are assigned to this card')
      }
    });
  });

module.exports = app;