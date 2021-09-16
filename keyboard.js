const { Markup } = require('telegraf');

function getMainMenu() {
  return Markup.keyboard([
    ['NVIDIA', 'AMD'],
  ]).resize();
}

module.exports = { getMainMenu };
