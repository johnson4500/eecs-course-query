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

    for (let courseIndex = 1; courseIndex < 136; courseIndex++) {
        await page.waitForSelector(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(3) > a`, {timeout: 10000});
        // await page.waitForTimeout(Math.random() * (10000 - 40000) + 40000);

        // Get course
        await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(1)')
        const courseName = await page.evaluate((courseIndex) => {
            data = document.querySelector(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(${courseIndex}) > td:nth-child(1)`)
            return data.textContent.trim()
        }, courseIndex)
        console.log(courseName)
        await page.waitForTimeout(1000)

        // Click on course description
        await page.click(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(${courseIndex}) > td:nth-child(3) > a`)
        await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > p:nth-child(5)', {timeout: 10000});
        await page.waitForTimeout(1000)

        // Click on course schedule
        if (courseIndex == 8) {
        await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > a', {timeout: 10000})
        await page.waitForTimeout(1000)
        await page.click('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > a')
        }
        
        // Check the amount of schedule tables present 
        await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody', {timeout: 10000})
        const numberOfTables = await page.evaluate(() => {
            const tdElements = Array.from(document.querySelectorAll('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr'))
            return tdElements.length
        })

        await page.waitForSelector('body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr', {timeout: 10000})
        
        for (let i = 1; i < numberOfTables + 1; i++) {
            const numberOfRows = await page.evaluate((index) => {
                const data = document.querySelectorAll(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(${index}) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr`)
                return data.length
            }, i)

            const section = await page.evaluate((index) => {
                const string2 = document.querySelector(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(${index}) > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > span`)
                return string2.textContent.trim().replace(/\s+/g, ' ')
            }, i)

            const profname = await page.evaluate((index) => {
                const string = document.querySelector(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(${index}) > td > table > tbody > tr:nth-child(2) > td`).textContent.trim()
                const lastIndex = string.lastIndexOf(' ')
                return string.substring(lastIndex)
            }, i) 

            for (let j = 2, tableindex = 1; j < numberOfRows + 1; j++, tableindex++) {
                const data = await page.evaluate((index, rowIndex, profnames, sections, courseNames) => {
                    const tdElements = Array.from(document.querySelectorAll(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(${index}) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${rowIndex}) td`));
                    if (document.querySelector(`body > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > table:nth-child(9) > tbody > tr:nth-child(${index}) > td > table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${rowIndex}) > td:nth-child(2)`).firstElementChild !== null) {
                        const contentArray = tdElements.map(td => {
                            // access all child nodes, including text nodes
                            const textNodes = Array.from(td.childNodes)
                                .filter(node => node.nodeType === Node.TEXT_NODE)
                                .map(node => node.textContent.trim());
                            return textNodes.join(' ');
                        });
                     
                        let result = []
                        for (let i = 2; i < contentArray.length; i+=5) {
                            if ((i - 2) % 5 == 0) {
                                result.push(contentArray.slice(i, i + 5))
                            }
                        }
                        var cutoff = result[result.length - 1].slice(0, 1)
                        result.map(element => {
                            element.push(cutoff[0])
                            element.push(contentArray[0])
                            element.push(profnames.trim())
                            element.push(sections)
                            element.push(parseInt(courseNames.split(" ")[1]))
                            element[2] = parseInt(element[2])
                            element[3] = element[3].replace(/\s+/g, ' ')
                        })
                        result.splice(result.length - 1, 1)
                        return result
                    }
                }, i, j, profname, section, courseName);
                
                if (data) {
                    let ob = {}
                    data.map(element => {
                        ob['day'] = element[0]
                        ob['time'] = element[1]
                        ob['duration'] = element[2]
                        ob['classroom'] = element[3]
                        ob['campus'] = element[4]
                        ob['cat_code'] = element[5]
                        ob['class_type'] = element[6]
                        ob['prof_name'] = element[7]
                        ob[`section`] = element[8]
                        ob['course_code'] = element[9]
                    })

                    setData()
                    async function setData() {
                        await axios.post(`http://localhost:8080/save/courseSchedule`, ob)
                        .then(res => {
                            console.log(res.data)
                        }).catch(error => {
                            console.log(error)
                        })
                    }
                }
            } 
        }
        await page.waitForTimeout(3000)
        await page.goBack();
        await page.goBack();
        await page.reload();
    }
    // await page.waitForTimeout(Math.random() * (10000 - 40000) + 40000);
    await browser.close()
}

run()