'use strict';

const bcrypt = require("bcrypt")
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
  }, {
    hooks:{
      beforeCreate((user,options)=>{
        return bcrypt.hash(user.password,10)
        .then (hash=>{
          user.password = hash
        })
        .catch(err=>{
          throw err
        })
      })
    }

  });
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};
