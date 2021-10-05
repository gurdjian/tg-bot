'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const Users = [
        {name: 'Alina', tgId:'1708576552'},
      ]
      await queryInterface.bulkInsert('Users', Users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
