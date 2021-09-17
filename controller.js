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
  static  getAdapters(contextFrom) {
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
}

module.exports = Controller;
