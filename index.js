const puppeteer = require('puppeteer');

const getItems = async searchTerm => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();

    await page.goto(`https://facebook.com/marketplace/search/?query=${encodeURI(searchTerm)}`);
}

getItems('Iphone 8');
