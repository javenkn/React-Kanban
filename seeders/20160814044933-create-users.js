'use strict';

var faker = require('faker');
var userArr = [];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
    {
      first_name: 'Bob',
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      first_name: 'Jeff',
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users');
  }
};
