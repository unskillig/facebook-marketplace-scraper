const puppeteer = require('puppeteer')

const getItems = async () => {
    const browser = puppeteer.launch({headless: false});
    const page = await browser.newPage();

}

getItems();
