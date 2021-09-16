'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const Adapters = [
        {title: 'AMD R9 NANO'},
        {title: 'NVIDIA RTX 3080 Ti'},
        {title: 'AMD RX 6900 XT'},
      ]
      await queryInterface.bulkInsert('Adapters', Adapters, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Adapters', null, {});
  }
};
