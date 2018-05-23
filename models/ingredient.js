'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
    Ingredient.belongsToMany(models.Menu,{through:models.Recipe})
  };
  return Ingredient;
};
