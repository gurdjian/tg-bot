class Controller {
  constructor (name) {
    this.name = name
  }
  async getAdapters(contextFrom) {
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
  async getPrices

}

module.exports = Controller
