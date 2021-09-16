const { PORT, TOKEN } = require('./config');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const { getCards } = require('./keyboard');
// const { User } = require('./db/models');
// const { Adapter } = require('./db/models');
const { Controller } = require('./controller');

const app = express();
const bot = new Telegraf(TOKEN);

bot.start(ctx => {
  Controller.getAdapters(ctx.from);
  ctx.reply('Выбери видеокарту', getCards());
  // console.log(ctx.from.first_name)
  // ctx.reply('Выбери разработчика видеокарты', getCardDeveloper());
});

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
