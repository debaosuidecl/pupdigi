// const request = require('request-promise-native');
// const poll = require('promise-poller').default;
// const proxyChain = require('proxy-chain');
// const tweeting = require('./tweeting');
const proxyChain = require('proxy-chain');

const express = require('express');
const app = express();
const Phones = require('./model/PhoneReal');
const Actual = require('./model/ActualData');
const mongoose = require('mongoose');
const connectDB = require('./config/db.js');
const puppeteer = require('puppeteer-extra');
// const puppeteerExtra = require('puppeteer-extra');
//
const axios = require('axios');
const solver = require('2captcha');
const requestToExternal = require('request');
const fs = require('fs');
const apiKey = '4fb64740ffa4b745aa944719725acafa';
const randomstring = require('randomstring');
const randomName = require('random-name');
const randomDayGen = require('random-day');
const randomMonthGen = require('random-month');
const randomYearGen = require('random-year');
var random_useragent = require('random-useragent');
var USER_AGENT = random_useragent.getRandom(function(ua) {
  return parseFloat(ua.browserVersion) >= 50 && ua.osName == 'Windows';
});
console.log(USER_AGENT, 'USER');

const returnRandom = () => {
  return Math.floor(Math.random() * 7000) + 3000;
};

const prepareForTest = async page => {
  await page.setUserAgent(
    `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36`
  );
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false
    });
  });
};

function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
// const pluginProxy = require('puppeteer-extra-plugin-proxy');
// add proxy plugin without proxy crendentials
const proxies = [
  1111,
  1112,
  1113,
  1114,
  1115,
  1116,
  1117,
  1118,
  1119,
  1120,
  1121,
  1122,
  1123,
  1124,
  1125,
  1126,
  1127,
  1128,
  1129,
  1130,
  1131,
  1132,
  1133,
  1134,
  1135
];

// get randomized indexes with shuffle

let shuffler = shuffle([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24
]);
const myFunc = async phones => {
  const NUM_BROWSERS = phones.length;
  const NUM_PAGES = 1;
  // const NUM_PAGES = phones[0].length;
  await (async () => {
    const startDate = new Date().getTime();
    const promisesBrowsers = [];
    for (let numBrowser = 0; numBrowser < NUM_BROWSERS; numBrowser++) {
      promisesBrowsers.push(
        new Promise(async resBrowser => {
          const oldProxyUrl = `http://195.154.161.11:${
            proxies[shuffler[numBrowser]]
          }`;
          // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
          // console.log(newProxyUrl);

          console.log(proxies[shuffler[numBrowser]]);
          const browser = await puppeteer.launch({
            headless: true,
            // slowMo: 100,
            ignoreHTTPSErrors: true,
            ignoreDefaultArgs: ['--enable-automation'],
            args: [
              `-no-sandbox`,

              '-disable-setuid-sandbox',
              `--proxy-server=${oldProxyUrl}`
              // `--proxy-server=http://us.smartproxy.com:10000`
            ],
            slowMo: 70
          });
          const promisesPages = [];

          for (let numPage = 0; numPage < NUM_PAGES; numPage++) {
            let textToWrite = phones[numBrowser].phone;
            // let textToWrite = phones[numBrowser][numPage].phone;
            console.log(textToWrite, 'for ' + numPage);
            promisesPages.push(
              new Promise(async resPage => {
                let t = setTimeout(async () => {
                  console.log('ending process now');
                  return process.exit(1);
                }, 500000);
                let page;
                try {
                  page = await browser.newPage();
                  await prepareForTest(page);

                  await page.setDefaultNavigationTimeout(60000);
                  // const twitterpage = await browser.newPage();
                  await page.goto('https://spydialer.com');
                  await page.type(
                    `[name="ctl00$ContentPlaceHolder1$SearchInputTextBox"]`,
                    textToWrite
                  );
                  await page.keyboard.press('Enter');
                  // await page.click(`input[type="submit"]`);
                  console.log('waiting form search button');
                  // await page.waitForNavigation();
                  // a[type=submit][value="Search"]'
                  try {
                    await page.waitForSelector('#search-button');
                  } catch (error) {
                    console.log('try typing and hitting enter again');
                    await page.type(
                      `[name="ctl00$ContentPlaceHolder1$SearchInputTextBox"]`,
                      textToWrite
                    );
                    await page.keyboard.press('Enter');
                  }
                  await page.waitForFunction(
                    `document.querySelector("#search-button").style.display.includes("block")`,
                    { timeout: 60000 }
                  );
                  await page.click(`input[type=submit][value="Search"]`);
                  console.log('great stuff');
                  try {
                    await page.waitForSelector(`.LargeName a`);
                    const element = await page.$('.LargeName a');
                    const text = await page.evaluate(
                      element => element.textContent,
                      element
                    );
                    console.log(text);
                    const newActual = new Actual({
                      phone: textToWrite,
                      name: text
                    });
                    await newActual.save();
                    console.log('saved ', text, ' in actual');
                  } catch (error) {
                    console.log('was not a link');
                    await page.waitForSelector(`.LargeName span`);
                    const element = await page.$('.LargeName span');
                    const text = await page.evaluate(
                      element => element.textContent,
                      element
                    );
                    console.log(text);
                  }

                  // return;
                  // console.log('click');
                  // await page.click(`[type=submit][value="Search"]`);
                  // console.log('seko');
                  // await page.waitForSelector(`.Largename a`);

                  // stage 1 type in [name="ctl00$ContentPlaceHolder1$SearchInputTextBox"]
                  //  stage 2 press enter
                  // wait for [type=submit][value="Search"]
                  //click on [type=submit][value="Search"]

                  // wait for .Largename a
                  // stage 3: find the innerText of a class .LargeName a
                  //store name in csv
                } catch (err) {
                  console.log(err);
                  clearTimeout(t);
                  console.log('timeout has been cleared');
                } finally {
                  // console.log(`An error occured`);
                  // await page.close();
                  // await twitterpage.close();
                  // await browser.close();
                }
                // }
                resPage();
              })
            );
          }
          await Promise.all(promisesPages);

          await browser.close();
          resBrowser();
        })
      );
    }
    await Promise.all(promisesBrowsers);

    console.log(
      `Time elapsed ${Math.round((new Date().getTime() - startDate) / 1000)} s`
    );

    //
  })();
  // }
  // timer();
};

// myFunc();

const shouldUpdateEmail = async () => {
  try {
    const phones1 = await Phones.find({}).limit(10);
    const phones2 = await Phones.find({})
      .skip(10)
      .limit(10);
    // console.log(emailLength.len, 'this is the email length');
    // if (emailLength < 25) {
    console.log('searching for phones');
    console.log(phones1);
    // return;
    await myFunc([...phones1]);
    // } else {
    // console.log('safe');
    // }

    setTimeout(shouldUpdateEmail, 10000);
    // console.log(response);
    //
  } catch (error) {
    console.log(error);
    console.log('error');
    setTimeout(shouldUpdateEmail, 10000);
  }
};

let PORT = 92000;
connectDB();
app.listen(PORT, () => {
  console.log('listening on PORT ', PORT);

  setTimeout(shouldUpdateEmail, 10000);
});
