'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate:(Menu, options) =>{
        Menu.name = `${Menu.name} (Hot/Cold)`;
      }
    }
  });
  Menu.associate = function(models) {
    Menu.belongsToMany(models.Ingredient, { through: models.Recipe })
    Menu.hasMany(models.Order);
  };
  return Menu;
};
