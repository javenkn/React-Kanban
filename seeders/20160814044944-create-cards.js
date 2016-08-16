'use strict';

var faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cards', [
    {
      title: 'Important business',
      priority: 100,
      status: 1,
      created_by: 'Jeff',
      assigned_to: 'Bob',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.name.jobTitle(),
      priority: 100,
      status: 1,
      created_by: 'Bob',
      assigned_to: 'Jeff',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cards');
  }
};
