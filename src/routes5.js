import { createPlaywrightRouter, Dataset } from "crawlee";
import moment from "moment";

// KINH TE CHUNG KHOAN
let currentDate = new Date();
export const router5 = createPlaywrightRouter();

// This replaces the request.label === DETAIL branch of the if clause.
router5.addHandler("DETAIL_KINHTECHUNGKHOAN", async ({ request, page, log }) => {
  log.debug(`Extracting data: ${request.url}`);

  let title = await page.locator(".detail-title").textContent();
  let resultTitle = title.replace(/[\/\s]+/g, " ");
  // .trim();
  // .replace(/\n/g, "");
  const timeElement = await page.locator(".datetime .format_date").first();
  const time = await timeElement.textContent();
  // const datePart = time.split(" - ")[0].trim();

  // const time = await page.locator('.dateandcat.pdate').textContent();
  const date = moment(currentDate).format("DD/MM/YYYY");
  if (date === time) {
    const results = {
      url: request.url,
      title: resultTitle.trim(),
      time: time,
    };
    log.debug(`Saving data: ${request.url}`);
    await Dataset.pushData(results);
  } else {
    console.log("date not between");
  }
});

router5.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);

  await Promise.all([
    await page.waitForSelector("ul.list-news.main-news"),
    await page.waitForSelector("ul.list-news.older-news.list-hr.list-hr3.clearfix"),
    await page.waitForSelector("li.clearfix"),
  ]);

  await enqueueLinks({
    selector: "ul.list-news.main-news > li > a, ul.list-news.older-news.list-hr.list-hr3.clearfix > li > a, li.clearfix > a",
    label: "DETAIL_KINHTECHUNGKHOAN",
  });
});
