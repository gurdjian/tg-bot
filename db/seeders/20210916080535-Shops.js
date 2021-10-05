'use strict';
const {User} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne();
      const Shops = [
        {shopName: 'DNS' , searchLink: 'https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/?p='},
        {shopName: 'MVideo' , searchLink: 'mvideo.ru'},
        {shopName: 'Citilink' , searchLink: 'citilink.ru'},
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
