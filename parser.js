const fs = require("fs");
const puppeteer = require("puppeteer");

const link = "https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/?p=";

async function parsData() {
  let flag = true;
  let res = [];
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
      width: 1400,
      height: 900,
    });
    while (flag) {
      await page.goto(`${link}${counter}`, {
        waitUntil: ["load", "domcontentloaded"],  
      });
      await page.waitForSelector("a.pagination-widget__page-link_next");
      console.log(counter);
      const html = await page.evaluate( async () => {
        const productArr = [];
        for(const product of document.querySelectorAll('.catalog-product')) {
          let productName = 'noname';
          const productNameNode = product.querySelector('.catalog-product__name');
          if (productNameNode) {
            if(productNameNode.innerText.match(/Видеокарта (.+) \[.+\] \[.+\]/i)) {
              // console.log(elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/i)[1])
              productName = productNameNode.innerText.match(/Видеокарта (.+) \[.+\] \[.+\]/i)[1];
            } else {
              console.log('!!!!===>', productNameNode.innerText)
              productName = productNameNode.innerText;
            } 
          } 
          productArr.push(productName);
        }
        return productArr.join('\n');

          // try {
          //   const divs = document.querySelectorAll("div.catalog-product");
          //   // console.log(divs);
          //   for (let i = 0; i < divs.length; i++) {
          //     alert(divs[i]);
          //   }
            // divs.forEach((div) => {
            //   const a = div.querySelector("a.catalog-product__name.ui-link.ui-link_black");
            //   console.log('a = ', JSON.stringify(a));
            //   let productTitle = '';
            //   // if (a !== null) {
            //   //   if(a.innerText.match(/Видеокарта (.+) \[.+\] \[.+\]/i)) {
            //   //     // console.log(elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/i)[1])
            //   //     productTitle = elem.title.match(/Видеокарта (.+) \[.+\] \[.+\]/i)[1];
            //   //   } else {
            //   //     console.log('!!!!===>', elem.title)
            //   //     productTitle = a.innerText;
            //   //   }
            //   //   productTitle = 'name';
            //   // } else {
            //     productTitle = 'no-name';
            //   // }
            //   const obj = {
            //     title: productTitle,
            //     link: a.href,
            //     price:
            //       div.querySelector("div.product-buy__price") !== null
            //         ? div.querySelector("div.product-buy__price").innerText
            //         : "no-price",
            //   };

            //   page1.push(obj);
            // });
          // } catch (err) {
          //   console.log(err);
          // }

          // return page1;
        }, counter,
        {
          waitUntil: "domcontentloaded",
        }
      );
      console.log(flag,'html = = =>', html);
      res.push(html);

      if (html.length === 0) flag = false;
      

      counter++;
      // console.log('flag = ', flag);
    }
   
    await browser.close();
    // res = res.flat();
    fs.writeFileSync(`./${(new Date()).toLocaleDateString()}.txt`, (res.join('\n')));
  } catch (err) {
    console.log(err);
  }
}

parsData();
