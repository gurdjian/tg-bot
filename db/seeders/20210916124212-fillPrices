'use strict';
const fs = require('fs')
const { Shop, Adapter } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
    adapterId
    adapterFullName: title,
    shopId: 1,
    price: price,
    available: true,
    parseTS: new Date(),
    adapterLink: link
    */
   const shop = await Shop.findOne();
  //  const adapter = await Adapter.findOne();
  //  console.log(adapter.id);
   const objAdapters = {};
   const data = JSON.parse(fs.readFileSync('./txt', 'utf-8')).reduce( (acc, elem) => {
    // console.log(elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/)[1]);  
    let fullName = '';
    if(elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/i)) {
      // console.log(elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/i)[1])
      fullName = elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/i)[1];
    } else {
      // console.log('!!!!===>', elem.title)
      fullName = elem.title;
    };
    objAdapters[fullName.match(/\b (.+)/)[1]] = '';
    acc.push({
        adapterId: 100,
        adapterFullName: fullName.match(/\b (.+)/)[1],
        price: elem.price === 'no-price' ? null : +elem.price.replace('₽', '').replace(/ /g,''),
        adapterLink: elem.link,
        shopId: shop.id,
        available: true,
        parseTS: new Date(),
      });
      return acc; 
    }, []);
    const adapters = Object.keys(objAdapters).map( (elem) =>  ({ title: elem }));

    await queryInterface.bulkInsert('Adapters', adapters, {});
    // const adapters = objAdapters.keys().forEach( (elem) =>  {title: elem});
    const newDataPromises = data.map( async (elem) =>{
      const adapter = await Adapter.findOne({where: {title: elem.adapterFullName}});
      elem.adapterId = adapter.id;
      return elem;
    }) 
    const newData = await Promise.all(newDataPromises);
    console.log(newData);
    await queryInterface.bulkInsert('Prices', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Prices', null, {});
  }
};
