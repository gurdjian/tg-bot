const timeOut = (func, time) =>
  new Promise((res) => setTimeout(() => res(func()), time));

function getInfo(ctx) {
  return ctx.reply(`Нажми /start, чтобы выбрать видеокарту
Нажми /statistic, чтобы увидеть статистику по данной видеокарте`)
}

function getPriceOfProduct(adapters) {
  const arr = adapters.map((elem) => elem.price);
  return arr;
}
function getDataOfProduct(adapters) {
  const arr = adapters.map((elem) => elem.date);
  return arr;
}

module.exports = { timeOut, getInfo, getPriceOfProduct, getDataOfProduct };
