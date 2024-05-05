import { createPlaywrightRouter, Dataset } from "crawlee";
import moment from "moment";

// VIET NAM BIZ
let currentDate = new Date();
export const router6 = createPlaywrightRouter();

// This replaces the request.label === DETAIL branch of the if clause.
router6.addHandler("DETAIL_VIETNAMBIZ", async ({ request, page, log }) => {
  log.debug(`Extracting data: ${request.url}`);

  let title = await page.locator("div.titledetail > h1").textContent();

  const timeElement = await page.locator(".vnbcbat-data").first();
  const timeGet = await timeElement.textContent();
  const time = timeGet.split(" | ")[1];

  // const datePart = time.split(" - ")[0].trim();

  // const time = await page.locator('.dateandcat.pdate').textContent();
  const date = moment(currentDate).format("DD/MM/YYYY");
  if (date === time) {
    const results = {
      url: request.url,
      title: title.trim(),
      time: time,
    };
    log.debug(`Saving data: ${request.url}`);
    await Dataset.pushData(results);
  } else {
    console.log("date not between");
  }
});

router6.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);
  // await page.waitForSelector("div.content");

  //   let title = await page.locator("span.timeago.need-get-timeago").first();
  //   const test = await title.textContent()
  // console.log('tetete',test);

  // Get all elements with class 'span.timeago.need-get-timeago' inside 'div.content'
  // const timeAgoElements = await page.$$("span.timeago.need-get-timeago");
  //   await Promise.all([
  //     await page.waitForSelector("div.content")
  //   ]);
  // let currentDate = new Date();
  // // Loop through each element and log its text content
  // for (const element of timeAgoElements) {
  //   let title = await element.textContent();
  //   if(title.includes('trước')) {
  //     await enqueueLinks({
  //       selector: "div.content > h3 > a",
  //       label: "DETAIL_VIETNAMBIZ",
  //     });
  //     // console.log('TIME',title);
  //   }else{
  //     const time = title.split(" | ")[1];
  //     if (time === moment(currentDate).format("DD/MM/YYYY")) {
  //         await enqueueLinks({
  //           selector: "div.content > h3 > a",
  //           label: "DETAIL_VIETNAMBIZ",
  //         });
  //     }   
  //    }
  // }

  await page.waitForSelector("div.content"),

  // await Promise.all([
  //   await page.waitForSelector("ul.list-news.main-news"),
  // ]);

  await enqueueLinks({
    selector: "div.content > h3 > a",
    label: "DETAIL_VIETNAMBIZ",
  });
});
