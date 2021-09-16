const { Markup } = require('telegraf');
const { Controller } = require('./controller');

function getCards(adapters) {
  //от контроллера из базы данных получаем title видеокарт 
  const kbArray = adapters.map((elem) => Markup.button.callback(elem.title, `${elem.title}/${elem.id}`));
  return Markup.inlineKeyboard([kbArray]);
}

// function getCards(adapters) {
//   const kbArray = adapters.map(el => el.title);
// return Markup.inlineKeyboard(kbArray).resize();

// return Markup.inlineKeyboard([

// Markup.button.callback(`${ Controller.getAdapters.getValue(Controller.getAdapters()) }`, `${ Controller.getAdapters.getValue(Controller.getAdapters()) }`),
// Markup.button.callback('AMD', 'AMD'),
// ]).resize();
//}

module.exports = { getCards };
