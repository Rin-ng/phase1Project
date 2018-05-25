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
    return queryInterface.bulkInsert('Recipes', [
      {
      MenuId: 1,
      IngredientId: 1,
      quantity:3,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 1,
      IngredientId: 4,
      quantity:3,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 1,
      IngredientId: 5,
      quantity:1,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 2,
      IngredientId: 1,
      quantity:2,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 2,
      IngredientId: 4,
      quantity:2,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 2,
      IngredientId: 5,
      quantity:1,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 3,
      IngredientId: 1,
      quantity:3,
      createdAt: new Date,
      updatedAt : new Date
    },{
      MenuId: 3,
      IngredientId: 4,
      quantity:2,
      createdAt: new Date,
      updatedAt : new Date
    },{
      MenuId: 3,
      IngredientId: 2,
      quantity:2,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 3,
      IngredientId: 5,
      quantity:1,
      createdAt: new Date,
      updatedAt : new Date
    },
    {
      MenuId: 4,
      IngredientId: 3,
      quantity:3,
      createdAt: new Date,
      updatedAt : new Date
    },{
      MenuId: 4,
      IngredientId: 5,
      quantity:1,
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
