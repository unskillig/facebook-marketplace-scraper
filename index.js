const puppeteer = require('puppeteer');

const getItems = async searchTerm => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();

    await page.goto(`https://facebook.com/marketplace/search/?query=${encodeURI(searchTerm)}`);

    await page.waitForSelector('div > div > span > div > a[tabindex="0"]')
    .then(() => page.evaluate(() => {
        const itemArray = [];
        const itemNodeList = document.querySelectorAll('div > div > span > div > a[tabindex="0"]');
        
        itemNodeList.forEach(item => {
            const itemTitle = item.getElementsByClassName('l9j0dhe7 stjgntxs ni8dbmo4').value;
            console.log(itemTitle);
        });

    }))
    .catch(() => console.log("Selector error."));

}

getItems('Iphone X');


