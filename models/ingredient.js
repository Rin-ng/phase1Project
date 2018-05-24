'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
    Ingredient.belongsToMany(models.Menu,{through:models.Recipe});
    Ingredient.hasMany(models.additionalIngredient);
    // Ingredient.belongsToMany(models.Order,{through: models.additionalIngredient });
  };
  return Ingredient;
};
