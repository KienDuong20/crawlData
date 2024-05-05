import { createPlaywrightRouter, Dataset } from "crawlee";
import moment from "moment";

// NGUOI QUAN SAT
let currentDate = new Date();
export const router3 = createPlaywrightRouter();

// This replaces the request.label === DETAIL branch of the if clause.
router3.addHandler(
  "DETAIL_NGUOIQUANSAT",
  async ({ request, page, log }) => {
    log.debug(`Extracting data: ${request.url}`);
    // Extract the title text
    // const titleElement = await page.locator(".c-detail-head__row .c-detail-head__title");
    const titleElement = await page.locator(".c-detail-head__row > h1");
    const title = await titleElement.textContent();

    const timeElement = await page.locator("div.c-detail-head__row.is-bar.is-line-bottom > span").first();
    const time = await timeElement.textContent();
    let resultTime = null;
    const timeParts = time.split(" ");
    resultTime = timeParts[0];

    const date = moment(currentDate).format("DD-MM-YYYY");
    if (date === resultTime) {
      const results = {
        url: request.url,
        title: title?.trim(),
        time: time,
      };
      log.debug(`Saving data: ${request.url}`);
      await Dataset.pushData(results);
    } else {
      console.log("date not between");
    }
  }
);

router3.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);

  await page.waitForSelector(".b-grid__content .b-grid__row");
  // Enqueue links from article.story inside both sections
  await enqueueLinks({
    selector:
      ".b-grid__content .b-grid__row > h2 > a, .b-grid__content .b-grid__row > h3 > a",
    label: "DETAIL_NGUOIQUANSAT",
  });
});

