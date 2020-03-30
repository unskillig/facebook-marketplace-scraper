const puppeteer = require('puppeteer');

const getItems = async searchTerm => {
    //{headless: false, defaultViewport: null} --> put this in launch() method below as parameter for developtment purposes --> opens up browser window
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();

    await page.goto(`https://facebook.com/marketplace/search/?query=${encodeURI(searchTerm)}`);

    const itemList = await page.waitForSelector('div > div > span > div > a[tabindex="0"]')
    .then(() => page.evaluate(() => {
        const itemArray = [];
        const itemNodeList = document.querySelectorAll('div > div > span > div > a[tabindex="0"]');
        
        itemNodeList.forEach(item => {
            const itemTitle = item.querySelector('div > div > span > div > a > div > div > div > span > div > span > div[class="l9j0dhe7 stjgntxs ni8dbmo4"').innerText;
            const itemPrice = item.querySelector('div > div > span > div > a > div > div > div > div > span[class="oi732d6d ik7dh3pa d2edcug0 qv66sw1b c1et5uql a8c37x1j s89635nw ew0dbk1b a5q79mjw g1cxx5fr lrazzd5p oo9gr5id"').innerText;
            const itemURL = `https://facebook.com/${item.getAttribute('href')}`;
            const itemImg = item.querySelector('div > div > span > div > a > div > div > div > div > div > div > img').getAttribute('src');
            
            itemArray.push({itemTitle, itemPrice, itemURL, itemImg});
        });
        return itemArray;
    }))
    .catch(() => console.log("Selector error."));

    return itemList;

}

const initScraper = async() => {
    const items = await getItems('Iphone X');
    items.sort(function(a, b){return a.itemPrice - b.itemPrice});
    console.log(items);
}

initScraper();




