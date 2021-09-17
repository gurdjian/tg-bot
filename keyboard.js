const { Markup } = require('telegraf');

function getCards(adapters) {
  const kbArray = adapters.map((elem) => Markup.button.callback(elem.title, `${elem.title}/${elem.id}`));
  return Markup.inlineKeyboard([kbArray]);
}

function getGraph() {
  return Markup.inlineKeyboard([
    Markup.button.callback('graph', 'graph'),
  ]);
}
module.exports = { getCards, getGraph };
