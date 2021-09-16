const { Markup } = require('telegraf');

function getMainMenu(adapters) {
  const kbArray = adapters.map( (elem) => elem.title)
  return Markup.keyboard(kbArray).resize();
}

module.exports = { getMainMenu };
