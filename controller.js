const { User, Shop, Adapter, Price } = require("./db/models");

class Controller {
  constructor() {
  }
  static getGroupAdapters(contextFrom) {
    return [
      {
        id: 1,
        title: "GeForce RTX 3070",
      },
      {
        id: 2,
        title: "GeForce RTX 3080",
      },
      {
        id: 3,
        title: "GeForce RTX 3080 Ti",
      }
    ]
  }
  static getAdapters(contextFrom) {
    return [
      {
        id: 1,
        title: "AMD Radeon R9",
      },
      {
        id: 2,
        title: "NVidia 3080",
      },
    ]
  }
  static async getPrices(id) {
    return [
      {
        id: 1,
        title: "GeForce RTX 3070",
        price: 45000,
      },
      {
        id: 2,
        title: "GeForce RTX 3080",
        price: 30000,
      },
      {
        id: 3,
        title: "GeForce RTX 3080 Ti",
        price: 20000
      }
    ]
  }
  static async getStatisticData(id) {
    return [
      {
        id: 1,
        title: "GeForce RTX 3070",
        shop: 'Citilink',
        price: [10000, 9500, 23000, 9000, 28000, 15000, 11500, 23000, 18000, 15000, 11500, 23000, 9000, 18000],
        date: ['01.09', '02.09', '03.09', '04.09', '05.09', '06.09', '07.09', '08.09', '09.09', '10.09', '11.09', '12.09', '13.09', '14.09']
      },
      {
        id: 2,
        title: "GeForce RTX 3080",
        shop: 'Citilink',
        price: [16000, 10500, 18000, 13000, 15000, 9000, 12500, 17000, 16000, 15000, 13500, 20000, 10000, 21000],
        date: ['01.09', '02.09', '03.09', '04.09', '05.09', '06.09', '07.09', '08.09', '09.09', '10.09', '11.09', '12.09', '13.09', '14.09']
      },
      {
        id: 3,
        title: "GeForce RTX 3080 TI",
        shop: 'Citilink',
        price: [10000, 9500, 23000, 9000, 28000, 15000, 11500, 23000, 18000, 15000, 11500, 23000, 9000, 18000],
        date: ['01.09', '02.09', '03.09', '04.09', '05.09', '06.09', '07.09', '08.09', '09.09', '10.09', '11.09', '12.09', '13.09', '14.09']
      },
    ]
  }
}

module.exports = Controller;
