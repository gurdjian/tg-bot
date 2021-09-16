const { Markup } = require('telegraf');
const { Controller } = require('./controller');

function getCards(adapters) {
  //от контроллера из базы данных получаем title видеокарт 
  const kbArray = adapters.map((elem) => Markup.button.callback(elem.title, `${elem.title}/${elem.id}`));
  return Markup.inlineKeyboard([kbArray]);
}

module.exports = { getCards };
