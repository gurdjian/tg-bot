const { Markup } = require('telegraf');

function getGroupCards(adapters) {
  const kbArray = adapters.map((elem) => Markup.button.callback(elem.title, `${elem.title}/${elem.id}`));
  return Markup.inlineKeyboard([kbArray]);
}

function getCards(adapters) {
  const kbArray = adapters.map((elem) => Markup.button.callback(elem.title, `${elem.title}/${elem.id}`));
  return Markup.inlineKeyboard([kbArray]);
}

module.exports = { getGroupCards, getCards };
