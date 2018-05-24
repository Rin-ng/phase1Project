'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    MenuId: DataTypes.INTEGER,
    customerName: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.hasMany(models.additionalIngredient);
    Order.belongsTo(models.Menu);
  };
  return Order;
};