const { User, Shop, Adapter, Price } = require('./db/models');

class Controller {
  constructor() {
  }
  static async getAdapters(contextFrom) {
    // const user = User.findOne({ where: {tgId: contextFrom.id}});
    const user = User.findOne();
    if (user) {

    } else {
      // await User.create({ name: contextFrom['first_name'], tgId: contextFrom.id });
    }
    return await Adapter.findAll({limit: 20})
    // return [
    //   {
    //     id: 1,
    //     title: "AMD Radeon R9",
    //   },
    //   {
    //     id: 2,
    //     title: "NVidia 3080",
    //   },
    // ]
  }
  static async getPrices(id) {
    const prices = Price.findAll({  include: {
        model: Shop,
        where: {id}
      }
    });
    // 'название, магазин, цена, наличие, ссылка'
    const textArr = []; //prices[0].adapterFullName
    prices.forEach(element => {
      textArr.push(`${element.Shop.shopName} ${element.price}  ${element.adapterLink}`)
    });
    textArr.push();
    return textArr.join('\n');
  }
}

module.exports = Controller;
