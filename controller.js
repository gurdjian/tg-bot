const { User, Adapter, Shop, AdapterGroup, Price } = require("./db/models");
const parser = require('./parser');

class Controller {
  constructor() {}
  static async getGroupAdapters(contextFrom) {
    // const user = User.findOne({ where: {tgId: contextFrom.id}});
    const user = User.findOne();
    if (user) {
    } else {
      // await User.create({ name: contextFrom['first_name'], tgId: contextFrom.id });
    }
    return await AdapterGroup.findAll({ limit: 20 });
  }

  static async getAdapters(adapterGroupId) {
    {
      const adapters = await Adapter.findAll({ 
        where: { groupId: adapterGroupId },
         limit: 20,
      });
      return adapters;
    }
  }

  static async parser() {
    const adapterGroups = await AdapterGroup.findAll();    
    const adapterGroupsArr = adapterGroups.map( elem => [elem.title, elem.id]);
    adapterGroupsArr.sort( (a, b) => {
      return b[0].length - a[0].length;
    });
    let {resPrices, resAdapters} = await parser.parsDns(adapterGroupsArr);
    // console.table(resAdapters.map( elem => JSON.stringify(elem)));
    const upsertAdapters = [];
    for ( const adapter of resAdapters){
      upsertAdapters.push(await upsert(adapter,  {title: adapter.title} ));
    }
    const upsertAdaptersHash = upsertAdapters.reduce( (acc, elem) => 
    {
      acc[elem.title] = elem.id;
      return acc;
    },{});
    console.table(upsertAdaptersHash);
    const shop = await Shop.findOne({order: [['id', 'DESC']]});
    resPrices = resPrices.map( (elem) => {
      elem.adapterId = upsertAdaptersHash[elem.title];
      elem.shopId = shop.id;
      return elem;
    });
    console.log(resPrices);
    
    await Price.bulkCreate(resPrices);

    function upsert(values, condition) {
      return Adapter
          .findOne({ where: condition })
          .then(function(obj) {
              // update
              if(obj)
                  return obj.update(values);
              // insert
              return Adapter.create(values);
          })
    }
  }

  static async getPrices(id) {
    //текст
    // из таблиц:
    // adapters: title
    // shops: shopName
    // prices: price
    // prices: available 
    // shops: searchLink
    // [
    //   {
    //     id: 1,
    //     title: "GeForce RTX 3070",
    //     price: 45000,
    //   },
    //   {
    //     id: 2,
    //     title: "GeForce RTX 3080",
    //     price: 30000,
    //   },
    //   {
    //     id: 3,
    //     title: "GeForce RTX 3080 Ti",
    //     price: 20000
    //   }
    // ]
    const result = await Price.findAll({
        where: {id: id},
        include: {
          model: Shop
        }
      });
    console.log(result);
    return result.map( (elem) => {
      return elem.Shop.shopName + ' : ' + elem.price;
    }).join('\n');
  }
  static async getStatisticData(id) {
    
    const shops = Shop.findAll();
    // const shopsArr = shops.map((elem) => )
    const shopId = 10;
    const prices = await Price.findAll( {where: { shopId: shopId, adapterId: id}});
    const pricesArr = prices.map((elem) => elem.price);
    const datesArr = prices.map((elem) => elem.createdAt.toLocaleTimeString());
    console.log(datesArr);
    return [
      {
        id: 1,
        title: "GeForce RTX 3070",
        shop: 'Citilink',
        price: pricesArr,
        date: datesArr,
      },
    ]
  }
}

module.exports = Controller;
