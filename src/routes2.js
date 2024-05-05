import { createPlaywrightRouter, Dataset } from "crawlee";
import moment from "moment";

// TIN NHANH CHUNG KHOAN
let currentDate = new Date();
export const router2 = createPlaywrightRouter();

// This replaces the request.label === DETAIL branch of the if clause.
router2.addHandler(
  "DETAIL_TINNHANHCHUNGKHOAN",
  async ({ request, page, log }) => {
    log.debug(`Extracting data: ${request.url}`);
    // Extract the title text
    const titleElement = await page.locator(".article__header");
    const title = await titleElement.textContent();

    const timeElement = await page.locator(".article__meta > time");
    const time = await timeElement.textContent();
    let resultTime = null;
    const timeParts = time.split(" ");
    resultTime = timeParts[0];

    const date = moment(currentDate).format("DD/MM/YYYY");
    if (date === resultTime) {
      const results = {
        url: request.url,
        title: title?.trim(),
        time: resultTime,
      };
      log.debug(`Saving data: ${request.url}`);
      await Dataset.pushData(results);
    } else {
      console.log("date not between");
    }
  }
);

router2.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);

  //   await page.waitForSelector(".main-column article.story");
  //   await enqueueLinks({
  //     selector: ".main-column article.story > h2 > a",
  //     label: "DETAIL_TINNHANHCHUNGKHOAN",
  //   });

  // Wait for the main-column and its children to be ready
  await page.waitForSelector(".main-column");

  // Wait for category-highlight and category-timeline to be ready
  await Promise.all([
    page.waitForSelector(".category-highlight"),
    page.waitForSelector(".category-timeline"),
  ]);

  // Wait for article.story inside category-highlight and category-timeline
  await Promise.all([
    page.waitForSelector(".category-highlight article.story"),
    page.waitForSelector(".category-timeline article.story"),
  ]);

  // Enqueue links from article.story inside both sections
  await enqueueLinks({
    selector:
      ".main-column .category-highlight article.story > h2 > a, .main-column .category-timeline article.story > h2 > a",
    label: "DETAIL_TINNHANHCHUNGKHOAN",
  });
});

