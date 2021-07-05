const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("ok");
});

function waitUntilTwelve() {
    return new Promise(resolve => {
        var d = new Date();
        setInterval(function() {
            if (d.getHours() == 0) {
                resolve(3);
            } else {
                console.log("Nope " + d.getHours());
            }
        }, 1000);
    });
}

app.get('/addReservation', async (req, res) => {

    var username = "";
    var password = ""; 
    // Define username & password variables

    (async () => {
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disabled-setupid-sandbox"],
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800
        })
        await page.goto('https://login.reservemycourt.com/login');
        await page.type('#email', username);
        await page.type('#password', password);
        await page.waitFor(500)

        await page.waitFor(500)
        await page.evaluate(() => {
            document.getElementById("login-form").submit();
        });
        await page.waitFor(5500)
        await page.goto('https://app.reservemycourt.com/clubs/CLB-122481bfda4744eabe3d6914693dd02a/reservations');
        await page.waitFor(2000)
        await page.evaluate(() => {
            addReservation();
        });
        await page.waitFor(2000)
        await page.evaluate(() => {

            const today = new Date();
            const date = new Date(today);
            date.setDate(date.getDate() + 1);
            var month = (date.getMonth().toString().length == 1) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = (date.getDate().toString().length == 1) ? "0" + date.getDate() : date.getDate();
            document.getElementById("addReservationStart").value = `${date.getFullYear()}-${month}-${day} 3:00 PM`;

            let a = document.getElementById("addReservationDurationPicker").childNodes;
            for (i = 0; i < a.length; i++) {
                if (a[i]) {
                    if (a[i].value != "120") {
                        a[i].remove();
                    }
                }
            }
            for (i = 0; i < a.length; i++) {
                if (a[i]) {
                    if (a[i].value != "120") {
                        a[i].remove();
                    }
                }
            }
            for (i = 0; i < a.length; i++) {
                if (a[i]) {
                    if (a[i].value != "120") {
                        a[i].remove();
                    }
                }
            }
            for (i = 0; i < a.length; i++) {
                if (a[i]) {
                    if (a[i].value != "120") {
                        a[i].remove();
                    }
                }
            }
        });
        var x = await waitUntilTwelve();
        await page.click(".wizard-footer > .pull-right > input")
        await page.waitFor(2000)
        await page.evaluate(() => {
            let element = document.querySelector(".tab-pane .row .form-check label");
            element.click();
        });

        await page.click(".wizard-footer > .pull-right > input")
        await page.waitFor(2000)
        await page.click("#addReservationSubmit")
        await page.waitFor(2000)
        await page.screenshot({
            path: 'screenshot.png'
        });
        await browser.close();
    })();
    res.status(200).send("ok");
});

app.listen(2000);