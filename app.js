const { PORT, TOKEN } = require('./config');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const { getCards } = require('./keyboard');
// const { User } = require('./db/models');
// const { Adapter } = require('./db/models');
const Controller = require('./controller');

const app = express();
const bot = new Telegraf(TOKEN);

bot.start(async ctx => {
  // Controller.getAdapters(ctx.from)
  const adapters = await Controller.getAdapters(ctx.from);
  const listOfVideocards = getCards(adapters);
  ctx.reply('Выбери видеокарту', listOfVideocards);
});

//текст
// из таблиц:
// adapters: title
// shops: shopName
// prices: price
// prices: available 
// shops: searchLink

bot.action(/.+/, (ctx, next) => {
  let id = ctx.match[0].split('/')[1]
  const txt = Controller.getPrices(id)
  console.log(txt, id);
  return ctx.reply(txt).then(() => next())
})

// bot.command('time', ctx => {
//   ctx.reply(String(new Date()));
// });

// bot.action(replyKB, ctx => {
//   for (let i of replyKB) {
//     if ((ctx.callbackQuery.data === replyKB[i])) {
//       getButton(ctx.callbackQuery.data)
//отправляет ответ на Controller 
//     }
//   }

bot.command('info', ctx => {
  ctx.reply(ctx.from);
});


bot.hears('покажи еще', ctx => {
  ctx.reply('/start');
});

bot.command('time', ctx => {
  ctx.reply(String(new Date()));
});

bot.on('text', ctx => {
  console.log(ctx.update.message.text);
  ctx.reply(ctx.update.message.text);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
