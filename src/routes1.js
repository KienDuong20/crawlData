import { createPlaywrightRouter, Dataset } from "crawlee";
import moment from "moment";

// MEKONG ASIA
let currentDate = new Date();
export const router1 = createPlaywrightRouter();

// This replaces the request.label === DETAIL branch of the if clause.
router1.addHandler("DETAIL_MEKONG", async ({ request, page, log }) => {
  log.debug(`Extracting data: ${request.url}`);
  // Extract the title text
  const titleElement = await page.locator(".detail__header > h1");
  const title = await titleElement.textContent();

  const timeElement = await page.locator(".time").first();
  const time = await timeElement.textContent();
  let resultTime = null;
  if (time.includes("trước")) {
    resultTime = moment(currentDate).format("DD/MM/YYYY");
  } else {
    const timeParts = time.split(" ");
    resultTime = timeParts[0];
  }

  const date = moment(currentDate).format("DD/MM/YYYY");
  if (date === resultTime) {
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

router1.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);

  await page.waitForSelector("article.story");
  await enqueueLinks({
    selector: "article.story > a",
    label: "DETAIL_MEKONG",
  });
});
