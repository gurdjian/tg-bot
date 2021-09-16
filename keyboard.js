const { Markup } = require('telegraf');
const { Controller } = require('./controller');

// массив объектов [{id: 1, title: 'fjdnv'}, {id: 2, title: 'fnvdkjfs'}]
function getValue(arr) {
  let newArr = [];
  for (let obj of arr) {
    newArr.push(obj.title);
  }
  return newArr;
}

function getCards() {
  return Markup.inlineKeyboard([
    Markup.button.callback(`${Controller.getAdapters.getValue(Controller.getAdapters())}`, `${Controller.getAdapters.getValue(Controller.getAdapters())}`),
    // Markup.button.callback('AMD', 'AMD'),
  ]).resize();
}

module.exports = { getCards };
