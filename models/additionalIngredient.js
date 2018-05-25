'use strict';
module.exports = (sequelize, DataTypes) => {
  var additionalIngredient = sequelize.define('additionalIngredient', {
    OrderId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER,
    addOn: DataTypes.INTEGER
  }, {});
  additionalIngredient.associate = function(models) {
    // associations can be defined here
    additionalIngredient.belongsTo(models.Order);
    additionalIngredient.belongsTo(models.Ingredient);
  };
  return additionalIngredient;
};