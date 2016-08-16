'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_cards', [
    {
      user_id: 1,
      card_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 1,
      card_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 2,
      card_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user_cards');
  }
};
