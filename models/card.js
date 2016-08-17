'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    created_by: DataTypes.STRING,
    assigned_to: DataTypes.STRING
  }, {
    tableName: 'cards',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Card.belongsToMany(models.User, {
          through: models.user_card,
          foreignKey: 'card_id'
        });
      }
    }
  });
  return Card;
};