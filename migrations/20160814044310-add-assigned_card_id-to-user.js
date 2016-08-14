'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'assigned_card_id', {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'cards',
        key: 'id'
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'assigned_card_id');
  }
};
