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
    return queryInterface.bulkInsert('Menus', [
      {
      name: 'Coffee Latte',
      price: 50000,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      name: 'Cappuccino',
      price: 45000,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      name: 'Mochachino',
      price: 48000,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      name: 'Matcha Green Tea',
      price: 38000,
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
