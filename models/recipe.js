'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    MenuId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
  };
  return Recipe;
};