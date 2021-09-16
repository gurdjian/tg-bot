const { PORT, TOKEN } = require('./config');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const { getMainMenu } = require('./keyboard');
const Controller = require('./controller')

const app = express();
const bot = new Telegraf(TOKEN);

bot.start(async ctx => {
  const adapters = await Controller.getAdapters(ctx.from);
  const replyKB = getMainMenu(adapters);
  ctx.reply('Choose adapter', replyKB);
});

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
