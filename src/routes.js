import { createPlaywrightRouter, Dataset } from "crawlee";
import moment from "moment";

// CAFE F
let currentDate = new Date();
export const router = createPlaywrightRouter();

// This replaces the request.label === DETAIL branch of the if clause.
router.addHandler("DETAIL_CAFEF", async ({ request, page, log }) => {
  log.debug(`Extracting data: ${request.url}`);
  // const urlPart = request.url.split('/').slice(-1); // ['sennheiser-mke-440-professional-stereo-shotgun-microphone-mke-440']
  // const manufacturer = urlPart[0].split('-')[0]; // 'sennheiser'

  // const title = await page.locator('.totalcontentdetail > h1').textContent();
  let title = await page.locator(".totalcontentdetail > h1").textContent();
  let resultTitle = title.replace(/[\/\s]+/g, " ");
  // .trim();
  // .replace(/\n/g, "");
  const timeElement = await page.locator(".dateandcat > span").first();
  const time = await timeElement.textContent();
  const datePart = time.split(" - ")[0].trim();

  // const time = await page.locator('.dateandcat.pdate').textContent();
  const date = moment(currentDate).format("DD-MM-YYYY");
  if (date === datePart) {
    const results = {
      url: request.url,
      title: resultTitle.trim(),
      time: time,
    };

    log.debug(`Saving data: ${request.url}`);
    await Dataset.pushData(results);
    // await Dataset.pushData(results);
    // if(Number(results?.currentPrice) < 500) {
    //     log.debug(`Saving data: ${request.url}`);
    //     await Dataset.pushData(results);
    // }
  } else {
    console.log("date not between");
  }
});

// This is a fallback route which will handle the start URL
// as well as the LIST labeled URLs.

router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);

  // This means we're on the start page, with no label.
  // On this page, we just want to enqueue all the category pages.
  await Promise.all([
    await page.waitForSelector("div.firstitem.wp100.clearfix .hl-info .time"),
    await page.waitForSelector("div.cate-hl-row2.mgt20 .big"),
    await page.waitForSelector("div.tlitem.box-category-item"),
  ]);

  await enqueueLinks({
    selector: "div.firstitem.wp100.clearfix .hl-info > h2 > a, div.cate-hl-row2.mgt20 .big > h3 > a, div.tlitem.box-category-item > h3 > a",
    label: "DETAIL_CAFEF",
  });
});
