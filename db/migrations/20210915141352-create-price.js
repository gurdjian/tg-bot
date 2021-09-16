'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adapterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Adapters',
          key: 'id'
        },
      },
      adapterFullName: {
        type: Sequelize.TEXT,
      },
      adapterLink: {
        type: Sequelize.TEXT,
      },
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shops',
          key: 'id'
        },
      },
      price: {
        type: Sequelize.INTEGER
      },
      available: {
        type: Sequelize.BOOLEAN
      },
      parseTS: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Prices');
  }
};
