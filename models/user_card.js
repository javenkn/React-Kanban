'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_card = sequelize.define('user_card', {
    user_id: DataTypes.INTEGER,
    card_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_card;
};