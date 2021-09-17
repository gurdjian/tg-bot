'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const AdapterGroups = [        
        {title: 'GeForce RTX 3070'},
        {title: 'GeForce RTX 3080'},
        {title: 'GeForce RTX 3080 Ti'},
      ]
      await queryInterface.bulkInsert('AdapterGroups', AdapterGroups, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('AdapterGroups', null, {});
  }
};
