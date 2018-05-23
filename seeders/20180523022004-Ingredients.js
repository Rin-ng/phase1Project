'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Ingredients', [{
      name: 'Coffe',
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      name: 'Chocolate',
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      name: 'Matcha Powder',
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      name: 'Milk',
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      name: 'Sugar',
      createdAt: new Date,
      updatedAt : new Date
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
