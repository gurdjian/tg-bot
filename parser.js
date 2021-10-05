const puppeteer = require("puppeteer");

class Parser {
  static async parsDns (adapterGroupsArr, shopLink) {
    const link = shopLink ? shopLink : "https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/?p=";
    let flag = true;
    let resPrices = [];
    let resAdapters = [];
    let counter = 1;
    try {
      const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        devtools: false,
      });
      const pages = await browser.pages();
      const page = pages[0];
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      while (flag) {
        await page.goto(`${link}${counter}`, {
          waitUntil: ["load", "domcontentloaded", "networkidle0"],  
        });
        await page.waitForSelector("a.pagination-widget__page-link_next");
        let html = await page.evaluate( async (counter, adapterGroupsArr) => {
          const productArr = [];
          const adaptersArr = [];
          for(const product of document.querySelectorAll('.catalog-product')) {
            // Определяем название карты
            let productName = "noname";
            const productNameNode = product.querySelector('.catalog-product__name');
            if (productNameNode) {
              productNameArr = productNameNode.innerText.match(/Видеокарта (.+) \[.+\] \[.+\]/i);
              if(productNameArr) {
                // +.log(elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/i)[1])
                productName = productNameArr[1];
              } else {
                productNameArr = productNameNode.innerText.match(/(.+) \[.+\] \[.+\]/i);
                if(productNameArr) {
                  productName = productNameArr[1];
                } else {
                  productName = productNameNode.innerText;
                }                 
              } 
            }
            // TODO: откинуть вендора
            // productName = productName.match(/\b (.+)/)[1];
            let productAdapterGroupId = 0;
            for (let adapterGroup of adapterGroupsArr) {
              if (productName.indexOf(adapterGroup[0]) > 0 ) {
                productAdapterGroupId = adapterGroup[1];
                break;
              }
            }
            // закончили определять название карты
            // цена - begin
            let productPrice = product.querySelector("div.product-buy__price").innerText;
            productPrice = productPrice.replace(/[₽ ]/g,'');
            // цена - end
            // Наличие - begin
            let productAvail = true // TODO: product.querySelector("***").innerText;
            // Наличие - end
            if (productAdapterGroupId > 0) {
              productArr.push({
                title: productName, 
                adapterLink: product.href,
                price: productPrice,
                available: productAvail,
                // parseTS: Date.now(),
              });
              adaptersArr.push({
                title: productName,
                groupId: productAdapterGroupId,
              })
            }
          }
          return { productArr, adaptersArr, length: document.querySelectorAll('.catalog-product').length };
          }, counter, adapterGroupsArr,
          {
            waitUntil: "domcontentloaded",
          }
        );
        // console.log(flag,'html = = =>', html);
        
        if (html.length === 0) {
          flag = false;
        } else {
          resAdapters = resAdapters.concat(html.adaptersArr);
          resPrices = resPrices.concat(html.productArr);
          counter++;
        }
      }
      await browser.close();
    } catch (err) {
      console.log(err);
    }
    return {resPrices, resAdapters};
  }
  
}

module.exports = Parser;
