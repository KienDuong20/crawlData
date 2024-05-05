import { PlaywrightCrawler, log, Dataset, KeyValueStore } from 'crawlee';
import { router } from './routes.js';
import { router1 } from './routes1.js';
import { router2 } from './routes2.js';
import { router3 } from './routes3.js';
import { router4 } from './routes4.js';
import { router5 } from './routes5.js';
import { router6 } from './routes6.js';

log.setLevel(log.LEVELS.DEBUG);

log.debug('Setting up crawler.');
const crawler = new PlaywrightCrawler({
    requestHandler: router,
    // maxRequestsPerCrawl: 10,
});

const crawler1 = new PlaywrightCrawler({
    requestHandler: router1,
    // maxRequestsPerCrawl: 20,
});

const crawler2 = new PlaywrightCrawler({
    requestHandler: router2,
    // maxRequestsPerCrawl: 20,
});

const crawler3 = new PlaywrightCrawler({
    requestHandler: router3,
    // maxRequestsPerCrawl: 10,
});
const crawler4 = new PlaywrightCrawler({
    requestHandler: router4,
    // maxRequestsPerCrawl: 10,
});
// const crawler4 = new PlaywrightCrawler({
//     maxRequestsPerCrawl: 20,
//     requestHandler: async ({ page, request, enqueueLinks }) => {
//         console.log(`Processing: ${request.url}`);

//         if (request.label === 'DETAIL_VIETSTOCK') {
//             const titleElement = await page.locator(
//                 "div.col-lg-10.col-sm-12.col-md-12 > h1"
//             );
//             const title = await titleElement.textContent();

//             const date = moment(currentDate).format("DD/MM/YYYY");
//             const timeElement = await page.locator("div.blog-single-head.text-left.mb10 div.meta > span").first();
//             const time = await timeElement.textContent();
//             let resultTime = null;
//             if (time?.toLowerCase().includes('trước')) {
//                 resultTime = moment(currentDate).format("DD/MM/YYYY");
//                 //   resultTime = '03/05/2024';
//             }
//             else {
//                 const timeParts = time?.split(" ") ?? '';
//                 resultTime = timeParts[0];
//             }
//             if (date === resultTime) {
//                 const results = {
//                     url: request.url,
//                     title: title?.trim(),
//                     // time: time,
//                 };
//                 log.debug(`Saving data: ${request.url}`);
//                 await Dataset.pushData(results);
//             } else {
//                 console.log("date not between");
//             }
//         } else {
//             await page.waitForSelector(
//                 "div.single_post.post_type12.type20.mb20.channelContent div.single_post_text"
//             );
//             await enqueueLinks({
//                 selector:
//                     "div.single_post.post_type12.type20.mb20.channelContent div.single_post_text > h4 > a",
//                 label: "DETAIL_VIETSTOCK",
//             });
//             // const nextButton = await page.$("li.pagination-page.next > a");
//             // if (nextButton) {
//             //     await enqueueLinks({
//             //         selector: "li.pagination-page.next > a",
//             //         label: "NEXT_PAGE",
//             //     });
//             // }
//         }
//     },
// });

const crawler5 = new PlaywrightCrawler({
    requestHandler: router5,
    // maxRequestsPerCrawl: 20,
});
const crawler6 = new PlaywrightCrawler({
    requestHandler: router6,
    // maxRequestsPerCrawl: 10,
});
// Run crawlers for both websites
await Promise.all([
    // CHUNG KHOAN
    // await crawler.run(['https://cafef.vn/thi-truong-chung-khoan.chn']),
    // await crawler1.run(['https://mekongasean.vn/chung-khoan/']),
    // await crawler2.run(['https://www.tinnhanhchungkhoan.vn/chung-khoan/']),
    await crawler3.run(['https://nguoiquansat.vn/chung-khoan']),
    // await crawler4.run(['https://vietstock.vn/chung-khoan.htm'])
    // await crawler5.run(['https://kinhtechungkhoan.vn/chung-khoan']),
    // await crawler6.run(['https://vietnambiz.vn/chung-khoan.htm']),

    // DOANH NGHIEP
    await crawler.run(['https://cafef.vn/doanh-nghiep.chn']),
    // await crawler1.run(['https://mekongasean.vn/doanh-nghiep/']),
    // await crawler2.run(['https://www.tinnhanhchungkhoan.vn/doanh-nghiep/']),
    // await crawler3.run(['https://nguoiquansat.vn/doanh-nghiep']),
    // await crawler4.run(['https://vietstock.vn/doanh-nghiep.htm'])
    // await crawler5.run(['https://kinhtechungkhoan.vn/doanh-nghiep']),
    // await crawler6.run(['https://vietnambiz.vn/doanh-nghiep.htm']),
]);

const dataset = await Dataset.open()

await KeyValueStore.setValue('OUTPUT', (await dataset.getData())?.items)

// NOTE PAGE: 
// routes: https://cafef.vn
// routes1: https://mekongasean.vn
// routes2: https://www.tinnhanhchungkhoan.vn
// routes3: https://nguoiquansat.vn/
// routes4: https://vietstock.vn/
// routes5: https://kinhtechungkhoan.vn/
// routes6: https://vietnambiz.vn/