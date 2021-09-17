const { User, Adapter, Shop, AdapterGroup, Price } = require("./db/models");
const parser = require('./parser');

class Controller {
  constructor() {}
  static async getAdapterGroups(contextFrom) {
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
      return await Adapter.findAll({ 
        where: { groupId: adapterGroupId },
         limit: 20,
      });
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
    const shop = await Shop.findOne();
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
    const prices = Price.findAll({
      include: {
        model: Shop,
        where: { id },
      },
    });
    // 'название, магазин, цена, наличие, ссылка'
    const textArr = []; //prices[0].adapterFullName
    prices.forEach((element) => {
      textArr.push(
        `${element.Shop.shopName} ${element.price}  ${element.adapterLink}`
      );
    });
    textArr.push();
    return textArr.join("\n");
  }
}

module.exports = Controller;
