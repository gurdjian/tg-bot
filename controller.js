class Controller {
  constructor () {

  }
  static async getAdapters(contextFrom) {
    console.log(contextFrom);
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
  // async getPrices

}

module.exports = Controller
