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
  Controller.getAdapters(ctx.from)
  const adapters = await Controller.getAdapters();
  const replyKB = getCards(adapters);
  ctx.reply('Выбери видеокарту', replyKB);
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
  // Controller.getPrice(id)
  return ctx.reply('название, магазин, цена, наличие, ссылка').then(() => next())
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

// })

// bot.action(['yes', 'no'], ctx => {
//   if (ctx.callbackQuery.data === 'yes') {
//       addTask('сюда будем передавать текст задачи')
//       ctx.editMessageText('Ваша задача успешно добавлена')
//   } else {
//       ctx.deleteMessage()
//   }
// })

bot.hears('хочу есть', ctx => {
  ctx.reply('Так передохни и покушай');
});

bot.command('time', ctx => {
  ctx.reply(String(new Date()));
});

bot.on('text', ctx => {
  ctx.reply('just text');
});

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));

// module.exports = { getInfo };
