const { Markup } = require('telegraf');

function getGroupCards(adapters) {
  const kbArray = adapters.map((elem) => Markup.button.callback(elem.title, `group/${elem.id}`));
  return Markup.inlineKeyboard(kbArray, {columns: 1});
}

function getCards(adapters) {

  const kbArray = adapters.map((elem) => Markup.button.callback(elem.title, `card/${elem.id}`));
  // console.log('!!!!!===========', kbArray);
  return Markup.inlineKeyboard(kbArray, {columns: 1});
}

function getStats(id) {
  
  const kbArray = [ Markup.button.callback('Статистика', `statistic/${id}`) ];
  // console.log('!!!!!===========', kbArray);
  return Markup.inlineKeyboard(kbArray, {columns: 1});
}

module.exports = { getGroupCards, getCards, getStats };
