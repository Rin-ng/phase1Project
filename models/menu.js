'use strict';
module.exports = (sequelize, DataTypes) => {
  var Menu = sequelize.define('Menu', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Menu.associate = function(models) {
    Menu.belongsToMany(models.Ingredient,{through:models.Recipe})
  };
  return Menu;
};
