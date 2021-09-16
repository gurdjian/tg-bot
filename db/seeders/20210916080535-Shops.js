'use strict';
const {User} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne();
      const Shops = [
        {shopName: 'DNS' , searchLink: 'dns.ru', userId: user.id},
        {shopName: 'MVideo' , searchLink: 'mvideo.ru', userId: user.id},
        {shopName: 'Citilink' , searchLink: 'citilink.ru', userId: user.id},
      ]
      await queryInterface.bulkInsert('Shops', Shops, {});
  },
  // shopName: DataTypes.STRING,
  // searchLink: DataTypes.TEXT,
  // userId: DataTypes.INTEGER
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Shops', null, {});
  }
};
