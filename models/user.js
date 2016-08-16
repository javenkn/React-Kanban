'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'users',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.belongsToMany(models.Card, {
          through: models.user_card,
          foreignKey: 'card_id'
        });
      }
    }
  });
  return User;
};