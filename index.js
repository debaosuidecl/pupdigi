// const request = require('request-promise-native');
// const poll = require('promise-poller').default;
// const proxyChain = require('proxy-chain');
// const tweeting = require('./tweeting');
const proxyChain = require('proxy-chain');

const express = require('express');
const app = express();
const UserData = require('./model/UserData');
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
let randomDay = randomDayGen({ min: 10 }).toString();
let randomMonth = randomMonthGen({ raw: true }).name;
let randomYear = randomYearGen({ min: 1970, max: 1990 }).toString();
const EMAIL_PASSWORD_ARRAY = [];

const returnRandom = () => {
  return Math.floor(Math.random() * 7000) + 3000;
};

solver.setApiKey(apiKey);

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
const pluginProxy = require('puppeteer-extra-plugin-proxy');
// add proxy plugin without proxy crendentials
const proxies = [
  10880,
  10881,
  10882,
  10883,
  10884,
  10885,
  10886,
  10887,
  10888,
  10889,
  10890,
  10891,
  10892,
  10893,
  10894,
  10895,
  10896,
  10897,
  10898,
  10899,
  10900,
  10901,
  10902,
  10903,
  10904
];

const NUM_BROWSERS = 5;
const NUM_PAGES = 1;
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
const myFunc = async () => {
  await (async () => {
    const startDate = new Date().getTime();
    const promisesBrowsers = [];
    for (let numBrowser = 0; numBrowser < NUM_BROWSERS; numBrowser++) {
      promisesBrowsers.push(
        new Promise(async resBrowser => {
          // puppeteer.use(
          //   pluginProxy({
          //     address: '62.210.169.37',
          //     port: proxies[shuffler[numBrowser]]
          //   })
          // );

          const oldProxyUrl = `http://62.210.169.37:${
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
            ],
            slowMo: 70
          });
          const promisesPages = [];

          for (let numPage = 0; numPage < NUM_PAGES; numPage++) {
            promisesPages.push(
              new Promise(async resPage => {
                //now

                console.log(`Visiting url: https://signup.live.com/signup`);
                const firstName = randomName.first();
                const lastName = randomName.last();
                const outlookpwd = `${randomstring.generate(8)}!`;
                const emailFirstHalf = `${firstName}.${lastName}${randomstring.generate(
                  5
                )}`;
                const email = `${emailFirstHalf}@outlook.com`;
                console.log(outlookpwd, 'password');
                const page = await browser.newPage();
                await page.setDefaultNavigationTimeout(60000);
                // const twitterpage = await browser.newPage();
                await prepareForTest(page);
                let t = setTimeout(async () => {
                  console.log('taking too long');
                  try {
                    await browser.close();
                    await page.waitForSelector('blah');
                  } finally {
                    throw Error('cannot find');
                  }
                }, 450000);
                try {
                  // await page.goto('https://twitter.com/signup');
                  // await page.goto('http://lumtest.com/myip.json');
                  // await page.waitForSelector('body');
                  // const body = await page.$('body');
                  // let tag = await body.getProperty('innerText');
                  // let tagText = await tag.jsonValue();
                  // console.log(tagText);
                  // // await page.goto('http://google.com');
                  // // console.log('we are there');
                  // // await browser.close();
                  // //
                  // return;

                  await page.goto('https://signup.live.com/signup');

                  await page.waitForSelector('#liveSwitch');
                  await page.click('#liveSwitch');
                  await page.waitFor(2380);
                  await page.type('#MemberName', emailFirstHalf);
                  await page.mouse.move(280, 100);
                  await page.mouse.down();
                  await page.mouse.move(200, 200);
                  await page.mouse.up();
                  await page.click('#iSignupAction');
                  await page.waitForSelector('#PasswordInput');
                  await page.mouse.move(200, 400);
                  await page.type('#PasswordInput', outlookpwd);
                  await page.waitFor(1321.3);
                  await page.click('#iSignupAction');

                  await page.waitForSelector('#FirstName');
                  await page.type('#FirstName', firstName);
                  await page.waitFor(482);
                  await page.type('#LastName', lastName);
                  await page.waitFor(1282);
                  await page.click('#iSignupAction');
                  await page.waitFor(882);
                  await page.waitForSelector('[name="BirthMonth"]');
                  await page.select('#BirthMonth', '4');
                  await page.select('#BirthDay', randomDay);
                  await page.select('#BirthYear', randomYear);
                  await page.mouse.move(700, 200);
                  await page.click('#iSignupAction');

                  await page.waitFor(3530);
                  await page.waitForSelector(
                    'img[aria-label="Visual Challenge"]'
                  );
                  const captchaImage = await page.$(
                    'img[aria-label="Visual Challenge"]'
                  );
                  const captchaLinkKey = await captchaImage.getProperty('src');
                  const imageLink = await captchaLinkKey.jsonValue();
                  console.log('seen');

                  const imageCaptchaPromise = () =>
                    new Promise(function(resolve, reject) {
                      solver.decodeUrl(
                        imageLink,
                        { pollingInterval: 10000 },
                        async function(err, result = {}, invalid) {
                          console.log(result.text);
                          try {
                            console.log('starting verification');
                            if (err) {
                              console.error('please try again', err);
                              browser.close();
                            }
                            if (!result) throw err;
                            if (result.text) {
                              console.log(result.text);

                              resolve(result.text);
                            }
                          } catch (e) {
                            console.error(e);
                            console.log('error from captcha block');
                            await browser.close();
                          } finally {
                            console.log('done with captcha');
                          }
                        }
                      );
                    });

                  const resultText = await imageCaptchaPromise();
                  // return;
                  const resultToBeEntered = resultText.replace(/ /g, '');
                  await page.type(`.spHipNoClear`, resultToBeEntered);
                  await page.waitFor(2200.32);
                  await page.click('#iSignupAction');

                  await page.waitForNavigation();
                  console.log('navigation after signup on outlook');
                  const page2 = await browser.newPage();
                  await prepareForTest(page2);
                  await page2.setDefaultNavigationTimeout(200000);
                  await page2.goto('https://outlook.live.com/mail/inbox');
                  await page2.waitFor(5000);
                  const refresh = await page2.waitForSelector(
                    '.refreshPageButton'
                  );

                  if (refresh) {
                    await page2.click('.refreshPageButton');
                    console.log('clicked on refresh');
                  }

                  await page2.waitForNavigation();
                  // await page.waitFor(20000);
                  await page.close();
                  await page2.close();
                  // now to twitter
                  const twitterpage = await browser.newPage();
                  twitterpage.setDefaultNavigationTimeout(290000);
                  await twitterpage.setViewport({
                    width: 800,
                    height: 600
                  });

                  await twitterpage.setUserAgent(
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36'
                  );

                  //TWITTER OPERATION BEGINS

                  await twitterpage.goto('https://twitter.com/signup');

                  await twitterpage.waitForSelector(
                    'div[role="button"] > span.css-901oao'
                  );
                  await twitterpage.click(
                    `div[role="button"] > span.css-901oao`
                  );
                  // type the first name and email for sign up
                  await twitterpage.type('[name="name"]', `${firstName}`);
                  await twitterpage.type('[name="email"]', `${email}`);
                  const dates = await twitterpage.$(`[aria-label="Month"]`);
                  // if suddenly the dates show up enter the dates
                  if (dates) {
                    await twitterpage.type('[aria-label="Month"]', randomMonth);
                    await twitterpage.select('[aria-label="Day"]', randomDay);
                    await twitterpage.select('[aria-label="Year"]', randomYear);
                  }

                  // select next button
                  await twitterpage.waitForSelector(
                    'div[role="button"].css-18t94o4'
                  );

                  const buttons = await twitterpage.$$(`span.css-901oao`);
                  console.log('click now');

                  function getText(spanText) {
                    spanText = spanText.replace(/\r\n|\r/g, '\n');
                    spanText = spanText.replace(/\ +/g, ' ');

                    // Replace &nbsp; with a space
                    var nbspPattern = new RegExp(String.fromCharCode(160), 'g');
                    return spanText.replace(nbspPattern, ' ');
                  }
                  for (var i = 0; i < buttons.length; i++) {
                    let valueHandle = await buttons[i].getProperty('innerText');
                    let spanText = await valueHandle.jsonValue();
                    const text = getText(spanText);
                    if (text == 'Next') {
                      await twitterpage.waitFor(returnRandom());

                      await buttons[i + 1].click();
                      // delay(2000);
                      await twitterpage.waitForSelector('span.css-901oao');
                      // move on to the next page
                      const nextbuttons = await twitterpage.$$(
                        `span.css-901oao`
                      );
                      for (var i = 0; i < nextbuttons.length; i++) {
                        let valueHandle = await nextbuttons[i].getProperty(
                          'innerText'
                        );
                        let spanText = await valueHandle.jsonValue();
                        const textNext = getText(spanText);
                        // console.log(textNext);
                        if (textNext == 'Next') {
                          await twitterpage.waitFor(returnRandom());
                          nextbuttons[i].click();
                          await twitterpage.waitForSelector(
                            `[role='button'] span.css-901oao`
                          );
                          const signUpButtonCandidates = await twitterpage.$$(
                            `[role='button'][data-focusable='true'] span.css-901oao`
                          );
                          // console.log(signUpButtonCandidates);

                          for (
                            var i = 0;
                            i < signUpButtonCandidates.length;
                            i++
                          ) {
                            let valueHandle = await signUpButtonCandidates[
                              i
                            ].getProperty('innerText');
                            let spanText = await valueHandle.jsonValue();
                            console.log(spanText);
                            const signUpText = getText(spanText);
                            console.log(signUpText);
                            if (signUpText == 'Sign up') {
                              console.log('seen Sign up');
                              //sign up
                              await twitterpage.waitFor(returnRandom());

                              signUpButtonCandidates[i].click();
                              await twitterpage.waitFor(30000);

                              const page3 = await browser.newPage();
                              await page3.setDefaultNavigationTimeout(60000);
                              await prepareForTest(page3);
                              // await page3.authenticate({
                              //   username: 'yvdjabhs-rotate',
                              //   password: 'neokz9hv29hq'
                              // });

                              await page3.goto(
                                'https://outlook.live.com/mail/inbox'
                              );
                              try {
                                await page3.waitForSelector(
                                  `[title="verify@twitter.com"]`
                                );
                                await page3.click(
                                  "[title='verify@twitter.com']"
                                );
                                await page3.click(
                                  "[title='verify@twitter.com']"
                                );

                                // await page3.click("[title='verify@twitter.com']");

                                console.log('clicked on verify');
                              } catch (error) {
                                console.log(
                                  'did not find in focused, going to low importance'
                                );
                                await page3.waitForSelector(
                                  `[data-icon-name="MailLowImportance"]`
                                );

                                await page3.click(
                                  `[data-icon-name="MailLowImportance"]`
                                );
                                await page3.waitForSelector(
                                  `[title="verify@twitter.com"]`
                                );
                                await page3.click(
                                  "[title='verify@twitter.com']"
                                );
                                await page3.click(
                                  "[title='verify@twitter.com']"
                                );
                                console.log(
                                  'clicked on verify in low importance'
                                );
                              }

                              await page3.waitFor(5000);
                              // await page3.waitForSelector(`[role="heading"]`);

                              // const headings = await page3.$$(
                              //   `[role="heading"]`
                              // );
                              // const twitterHeading = headings[1];

                              // let tweetercode = await page3.evaluate(
                              //   twitterHeading => twitterHeading.innerText,
                              //   twitterHeading
                              // );
                              // console.log(tweetercode.substring(0, 6));
                              await page3.waitForSelector(`.x_black`);
                              const posCode = await page3.$$(`.x_black`);
                              const tcodeMaybe = posCode[3];
                              let tcode = await page3.evaluate(
                                tcodeMaybe => tcodeMaybe.innerText,
                                tcodeMaybe
                              );
                              console.log(
                                tcode,
                                'this is the alternate source for the tweetcode'
                              );
                              // let tweetercode = await page2.evaluate(
                              //   tweetercodeTag =>
                              //     tweetercodeTag.innerText,
                              //   tweetercodeTag
                              // );

                              // console.log(verifyCode);
                              await twitterpage.bringToFront();
                              await twitterpage.type(
                                `[name="verfication_code"]`,
                                tcode.substring(0, 6)
                              );
                              const nextAfterVerificationButtons = await twitterpage.$$(
                                `span.css-901oao`
                              );
                              for (
                                var i = 0;
                                i < nextAfterVerificationButtons.length;
                                i++
                              ) {
                                let valueHandle = await nextAfterVerificationButtons[
                                  i
                                ].getProperty('innerText');
                                let spanText = await valueHandle.jsonValue();
                                const textNextAfterVerificationButtons = getText(
                                  spanText
                                );
                                console.log(textNextAfterVerificationButtons);
                                if (
                                  textNextAfterVerificationButtons == 'Next'
                                ) {
                                  await nextAfterVerificationButtons[i].click();
                                  await twitterpage.waitForSelector(
                                    `input[type="password"]`
                                  );
                                  const twitterpassword = randomstring.generate(
                                    10
                                  );

                                  await twitterpage.type(
                                    `input[type="password"]`,
                                    twitterpassword
                                  );
                                  console.log(twitterpassword);
                                  // now press next after password
                                  const nextAfterPasswordButtons = await twitterpage.$$(
                                    `span.css-901oao`
                                  );
                                  for (
                                    var i = 0;
                                    i < nextAfterPasswordButtons.length;
                                    i++
                                  ) {
                                    let valueHandle = await nextAfterPasswordButtons[
                                      i
                                    ].getProperty('innerText');
                                    let spanText = await valueHandle.jsonValue();
                                    const textNextAfterPasswordButtons = getText(
                                      spanText
                                    );
                                    console.log(textNextAfterPasswordButtons);
                                    if (
                                      textNextAfterPasswordButtons == 'Next'
                                    ) {
                                      await twitterpage.waitFor(2000);
                                      await nextAfterPasswordButtons[i].click();
                                      await twitterpage.waitFor(2000);

                                      // EMAIL_PASSWORD_ARRAY.push({
                                      //   email,
                                      //   twitterpassword,
                                      //   outlookpwd
                                      // });
                                      // await browser.close();
                                      //save password to database await

                                      // const confirmSignUpButtons = await twitterpage.$$(
                                      //   `span.css-901oao`
                                      // );
                                      // for (
                                      //   var i = 0;
                                      //   i < confirmSignUpButtons.length;
                                      //   i++
                                      // ) {
                                      //   let valueHandle = await confirmSignUpButtons[
                                      //     i
                                      //   ].getProperty('innerText');
                                      //   let spanText = await valueHandle.jsonValue();
                                      //   const textconfirmSignUpButtons = getText(
                                      //     spanText
                                      //   );
                                      //   console.log(textconfirmSignUpButtons);
                                      //   if (
                                      //     textconfirmSignUpButtons ==
                                      //     'Pick a profile picture'
                                      //   ) {
                                      //firebase
                                      let newUserData = new UserData({
                                        email,
                                        twitterpassword,
                                        outlookpwd
                                      });
                                      const freshData = await newUserData.save();
                                      console.log(freshData, 'data saved');
                                      console.log('record saved in database');
                                      clearTimeout(t);
                                      // console.log('done with tweeting');
                                      // }
                                      // }
                                    }
                                  }
                                  return;
                                }
                              }
                              // });
                              return;
                            }
                            // return
                          }
                          return;
                        }
                      }
                      return;
                    }
                    //Pick a profile picture
                  }
                } catch (err) {
                  console.log(err);
                  clearTimeout(t);
                  console.log('timeout has been cleared');
                  await browser.close();
                } finally {
                  // console.log(`An error occured`);
                  // await page.close();
                  // await twitterpage.close();
                }
                // }
                resPage();
              })
            );
          }
          await Promise.all(promisesPages);

          // await browser.close();
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

let runFunc = false;
let emailLength;
const shouldUpdateEmail = async () => {
  try {
    const emailLength = await UserData.countDocuments({});
    console.log(emailLength, 'this is the email length');
    if (emailLength < 25) {
      await myFunc();
    } else {
      console.log('safe');
    }

    setTimeout(shouldUpdateEmail, 20000);
    // console.log(response);
    //
  } catch (error) {
    console.log(error);
    console.log('error');
    setTimeout(shouldUpdateEmail, 10000);
  }
};

let PORT = process.env.PORT || 7000;
connectDB();
app.listen(PORT, () => {
  console.log('listening on PORT ', PORT);

  setTimeout(shouldUpdateEmail, 10000);
});
