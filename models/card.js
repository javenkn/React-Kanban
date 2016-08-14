'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('card', {
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    created_by: DataTypes.STRING,
    assigned_to: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Card.belongsToMany(models.User, {
          foreignKey: 'assigned_card_id'
        });
      }
    }
  });
  return Card;
};