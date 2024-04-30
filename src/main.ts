import { PlaywrightCrawler, log, Dataset, KeyValueStore } from 'crawlee';
import { router } from './routes.js';

// This is better set with CRAWLEE_LOG_LEVEL env var
// or a configuration option. This is just for show 😈
log.setLevel(log.LEVELS.DEBUG);

log.debug('Setting up crawler.');
const crawler = new PlaywrightCrawler({
    // Instead of the long requestHandler with
    // if clauses we provide a router instance.
    requestHandler: router,
    // maxRequestsPerCrawl: 20,
});

// await crawler.run(['https://warehouse-theme-metal.myshopify.com/collections']);
await crawler.run(['https://cafef.vn/thi-truong-chung-khoan.chn']);

const dataset = await Dataset.open()
// console.log('datasetsdatasets', dataset.getData());


await KeyValueStore.setValue('OUTPUT', (await dataset.getData())?.items)