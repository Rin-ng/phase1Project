'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    password: DataTypes.STRING
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};
