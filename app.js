const { PORT, TOKEN } = require('./config');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const { Telegraf } = require('telegraf');
const { getCards, getGraph } = require('./keyboard');
// const { User } = require('./db/models');
// const { Adapter } = require('./db/models');
const Controller = require('./controller');

const app = express();
const bot = new Telegraf(TOKEN);

bot.start((ctx, next) => {
  ctx.reply(
    `Приветствую, ${ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Набери /help и увидишь, что я могу.`)
  next();
});
bot.help(async (ctx, next) => {
  // Controller.getAdapters(ctx.from)
  const adapters = await Controller.getAdapters(ctx.from);
  const listOfVideocards = getCards(adapters);
  ctx.reply('Выбери видеокарту', listOfVideocards);
  next();
});
// bot.action('')
// bot.start((ctx) =>
//   ctx.reply(
//     `Приветствую, ${ctx.from.first_name ? ctx.from.first_name : "хороший человек"
//     }! Набери /help и увидишь, что я могу.`
//   )
// );

//текст
// из таблиц:
// adapters: title
// shops: shopName
// prices: price
// prices: available 
// shops: searchLink

// bot.action('График', (ctx) => {

// });

// bot.action('graph', async (ctx, next) => {
//   ctx.reply('Hello')
//   ctx.replyWithPhoto({ source: "./chart.png" });
//   next();
// })


bot.action(/.+/, async (ctx, next) => {
  let id = ctx.match[0].split('/')[1];
  // const idProduct = await Controller.getPrice(id);
  ctx.reply('название, магазин, цена, наличие, ссылка');
  // ctx.reply('/start');
  ctx.reply(`Если хочешь увидеть статистику, жми /статистика`);
  next();
});
bot.command('/statistic', (ctx, next) => {
  ctx.replyWithPhoto({ source: "./chart.png" });
    next();
})

// bot.command('graph', (ctx) => {
//   const chatId = ctx.chat.id;
//   ctx.replyWithPhoto(chatId, 'chart.png');
// });

bot.command('info', ctx => {
  ctx.reply(ctx.from);
});


bot.hears('покажи еще', ctx => {
  ctx.reply('/start');
});

bot.command('time', ctx => {
  ctx.reply(String(new Date()));
});

// bot.on('text', ctx => {
//   ctx.reply(ctx.update.message.text);
// });

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`));
