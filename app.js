const { PORT, TOKEN } = require('./config');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const { getCards, getGroupCards } = require('./keyboard');
const Controller = require('./controller');

const app = express();
const bot = new Telegraf(TOKEN);

bot.start(async (ctx, next) => {
  // Controller.getAdapters(ctx.from)
  const groupadapters = await Controller.getGroupAdapters(ctx.from);
  const groupsOfVideocards = getGroupCards(groupadapters);
  ctx.reply('Выбери видеокарту', groupsOfVideocards);
  next();
});

bot.action('GeForce RTX 3070/1', async (ctx) => {
  let id = ctx.match[0].split('/')[1];
  // const idProduct = await Controller.getPrice(id);
  const adapters = await Controller.getAdapters(ctx.from);
  const listOfVideocards = getCards(adapters);
  ctx.reply('Выбери видеокарту', listOfVideocards);
  // next();
});

bot.action('GeForce RTX 3080', async (ctx) => {
  let id = ctx.match[0].split('/')[1];
  // const idProduct = await Controller.getPrice(id);
  const adapters = await Controller.getAdapters(ctx.from);
  const listOfVideocards = getCards(adapters);
  ctx.reply('Выбери видеокарту', listOfVideocards);
  // next();
});

bot.action('GeForce RTX 3080 Ti', async (ctx) => {
  let id = ctx.match[0].split('/')[1];
  // const idProduct = await Controller.getPrice(id);
  const adapters = await Controller.getAdapters(ctx.from);
  const listOfVideocards = getCards(adapters);
  ctx.reply('Выбери видеокарту', listOfVideocards);
  // next();
});

const timeOut = (func, time) =>
  new Promise((res) => setTimeout(() => res(func()), time));

function getInfo(ctx) {
  return ctx.reply(`Нажми /start, чтобы выбрать видеокарту
Нажми /statistic, чтобы увидеть статистику по данной видеокарте`)
}

bot.action(/.+/, async (ctx) => {
  let id = ctx.match[0].split('/')[1];
  // const idProduct = await Controller.getPrice(id);
  ctx.reply('название, магазин, цена, наличие, ссылка');
  await timeOut(() => getInfo(ctx), 1000);
  // ctx.reply(`Если хочешь увидеть статистику, жми /статистика`);
});

bot.help((ctx, next) => {
  ctx.reply(`Нажми /start, чтобы выбрать видеокарту
  Нажми /statistic, чтобы увидеть статистику по данной видеокарте`)
  next()
});


bot.command('/statistic', (ctx, next) => {
  ctx.replyWithPhoto({ source: "./chart.png" });
  next();
})

bot.on('text', ctx => {
  ctx.reply(ctx.update.message.text);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
