class Controller {
  constructor() {
  }
  static async getAdapters(contextFrom) {
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
        
      }
    ]
  }
}

module.exports = Controller;
