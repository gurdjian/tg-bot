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
      slowMo: 100,
      devtools: true,
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1400,
      height: 900,
    });
    while (flag) {
      await page.goto(`${link}${counter}`);
      await page.waitForSelector("a.pagination-widget__page-link_next");
      console.log(counter);

      const html = await page.evaluate(
        async () => {
          const page = [];

          try {
            const divs = document.querySelectorAll("div.catalog-product");
            console.log(divs);
            divs.forEach((div) => {
              const a = div.querySelector(
                "a.catalog-product__name.ui-link.ui-link_black"
              );

              const obj = {
                title: a !== null ? a.innerText : "no-name",
                link: a.href,
                price:
                  div.querySelector("div.product-buy__price") !== null
                    ? div.querySelector("div.product-buy__price").innerText
                    : "no-price",
              };

              page.push(obj);
            });
          } catch (err) {
            console.log(err);
          }

          return page;
        },
        {
          waitUntil: "a.pagination-widget__page-link_next",
        }
      );
      res.push(html);

      for (const i in res) {
        if (res[i].length === 0) flag = false;
      }

      counter++;
    }

    await browser.close();
    res = res.flat();
    fs.writeFileSync("./txt", JSON.stringify(res));
  } catch (err) {
    console.log(err);
  }
}

parsData();
