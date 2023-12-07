const puppeteer = require('puppeteer')
const axios = require('axios')
const username = "yourusernamehere"
const password = "yourpasswordhere"
const USERNAME_SELECTOR = "#mli";
const PASSWORD_SELECTOR = "#password";
const CTA_SELECTOR = "body > div.container.page-content > div.row > div:nth-child(1) > form > div:nth-child(2) > div.col-md-8 > p:nth-child(2) > input";
const SUBMIT_COURSE_SELECTOR = "body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > form > table > tbody > tr:nth-child(4) > td:nth-child(2) > input[type=submit]"

async function run() {
    const browser = await puppeteer.launch({
        args: [`--window-size=1920,1080`],
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
        headless: false
    })

    const page = await browser.newPage()
    await page.goto('https://eclass.yorku.ca/my/')
    await page.waitForNavigation();
    await page.waitForSelector(USERNAME_SELECTOR, {timeout: 10000});
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(username, {delay: 5});

    await page.waitForSelector(PASSWORD_SELECTOR, {timeout: 10000});
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(password, {delay: 5});

    await page.waitForSelector(CTA_SELECTOR, {timeout: 10000});
    await page.click(CTA_SELECTOR);
    await page.waitForNavigation();
    await page.waitForNavigation();

    await page.goto('https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm');
    await page.waitForSelector('body > p > table > tbody > tr:nth-child(2) > td.bodytext > table > tbody > tr:nth-child(3) > td > a', {timeout: 10000});
    await page.click('body > p > table > tbody > tr:nth-child(2) > td.bodytext > table > tbody > tr:nth-child(3) > td > a');

    await page.waitForSelector('#subjectSelect > option:nth-child(67)', {timeout: 10000});
    await page.click('#subjectSelect > option:nth-child(67)');

    await page.waitForSelector(SUBMIT_COURSE_SELECTOR, {timeout: 10000});
    await page.click(SUBMIT_COURSE_SELECTOR);

    for (let i = 78; i < 137; i++) {
        await page.waitForSelector(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(${i}) > td:nth-child(3) > a`, {timeout: 10000});
        await page.waitForTimeout(Math.random() * (10000 - 40000) + 40000);
        await page.click(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(${i}) > td:nth-child(3) > a`)
        await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > p:nth-child(5)', {timeout: 10000});
        
        const data = await page.evaluate(() => {
            var desc = document.querySelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > p:nth-child(5)')
            return desc.textContent.trim()
        })

        await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr > td:nth-child(1) > h1', {timeout: 10000})
        const courseCode = await page.evaluate(() => {
            var desc = document.querySelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr > td:nth-child(1) > h1')
            return desc.textContent.split(' ')[1].trim()
        })

        setData()
        async function setData() {
            await axios.put(`http://localhost:8080/update/course_code/${courseCode}`, 
            {
                course_description: data
            }
            ).then(res => {
                console.log(courseCode)
                console.log(res.data)
            }).catch(error => {
                console.log(error)
            })
        }

        await page.waitForTimeout(Math.random() * (10000 - 40000) + 40000);
        await page.goBack();
        await page.waitForTimeout(Math.random() * (5000 - 3000) + 3000);
        await page.reload();
    }

    await browser.close()
}

run()