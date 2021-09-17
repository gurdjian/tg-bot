const { PORT, TOKEN } = require('./config');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const { getCards, getGroupCards, getStats } = require('./keyboard');
const Controller = require('./controller');
const Charts = require('./statistic/chart');
const { timeOut, getInfo, getPriceOfProduct, getDataOfProduct } = require('./functionsToApp');

const app = express();
const bot = new Telegraf(TOKEN);

// Controller.parser();
setInterval( async () => {
  // Controller.parser();
}, 150000);
bot.start(async (ctx, next) => {
  // Controller.getAdapters(ctx.from)
  const groupadapters = await Controller.getGroupAdapters(ctx.from);
  const groupsOfVideocards = getGroupCards(groupadapters);
  ctx.reply('Выбери видеокарту', groupsOfVideocards);
  next();
});

bot.action(/group\/.+/, async (ctx) => {
  let id = ctx.match[0].split('/')[1];
  // const idProduct = await Controller.getPrice(id);
  const adapters = await Controller.getAdapters(id);
  const listOfVideocards = getCards(adapters);
  ctx.reply('Выбери видеокарту', listOfVideocards);
  // next();
});

bot.action(/card\/.+/, async (ctx) => {
  
  let id = ctx.match[0].split('/')[1];
  let txt = await Controller.getPrices(id); 
  txt = `${txt}\nНажми /start, чтобы выбрать группу`;
  console.log('txt = ', txt);
  ctx.reply(txt, getStats(id));
});


bot.action(/statistic\/.+/, async (ctx) => {
  let id = ctx.match[0].split('/')[1];
  // console.log(id);
  const statisticOfProduct = await Controller.getStatisticData(id);
  
  const statistic = new Charts(statisticOfProduct[0].price, statisticOfProduct[0].date);
  statistic.chart()
  ctx.replyWithPhoto({ source: "./statistic/chart.png" });
  // next();
});


bot.action(/.+/, async (ctx) => {
  // console.log(ctx.match[0]);
  let id = ctx.match[0].split('/')[1];
  // const idProduct = await Controller.getStatisticData(id);
  let txt = await Controller.getPrices(id);
  txt = txt + '\n' + `Нажми /start, чтобы выбрать видеокарту
  Нажми /statistic, чтобы увидеть статистику по данной видеокарте`;
  console.log(txt, id);
  ctx.reply(txt).then(() => next());
});


bot.help((ctx, next) => {
  ctx.reply(`Нажми /start, чтобы выбрать видеокарту
  Нажми /statistic, чтобы увидеть статистику по данной видеокарте`)
  next()
});

// bot.command('/statistic', async (ctx, next) => {
//   // let id = ctx.match[0].split('/')[1];
//   // console.log(id)
//   console.log(Controller.getStatisticData())
//   const statisticOfProduct = await Controller.getStatisticData();
//   console.log('getPriceOfProduct(statisticOfProduct)', getPriceOfProduct(statisticOfProduct))
//   console.log('getDataOfProduct(statisticOfProduct)', getDataOfProduct(statisticOfProduct))
//   const statistic = new Charts(getPriceOfProduct(statisticOfProduct[0]), getDataOfProduct(statisticOfProduct[0]));
//   console.log('statistic', statistic)
//   console.log('statistic.chart()', statistic.chart())
//   statistic.chart()
//   ctx.replyWithPhoto({ source: "./statistic/chart.png" });
//   next();
// })

// bot.on('text', ctx => {
//   ctx.reply(ctx.update.message.text);
// });

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
