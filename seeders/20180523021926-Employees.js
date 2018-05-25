'use strict';

// const model = require('../models')

module.exports = {
  up: (queryInterface, Sequelize) => {


    // models.Employee.create({
    //   name: 'brama',
    //   username: 'bramPrasetyo',
    //   password:'12345',
    //   createdAt: new Date,
    //   updatedAt: new Date
    // }).then(function() {
    //   console.log('done')
    // })

    return queryInterface.bulkInsert('Employees', [{
      name: 'brama',
      username: 'bramPrasetyo',
      password:'$2b$10$pmDV.f7p3omqT3obJ84bCeJzl0K3z/f0kS4bhk5IgCfUImvY.g8tO',
      createdAt: new Date,
      updatedAt: new Date
    } ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete("Employees", null, {});
  }
};
