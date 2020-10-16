const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(9001);

async function initBot() {
  const phone = "11942395212";
  const messages = [];
  //   const messages = ["Escolha", "Diversas", "Mensagens", "e", "Divirta-se"];
  const message = "Teste";
  const loops = 10;

  try {
    const browse = await puppeteer.launch({
      headless: false,
      executablePath: "/opt/google/chrome/google-chrome",
      userDataDir: "./myUserDataDir",
      args: ["--user-data-dir=./myUserDataDir"],
    });
    const page = await browse.newPage();
    await page.goto(
      `https://web.whatsapp.com/send?phone=55${phone}&text&app_absent=0`
    );

    await console.log(`mensagem:${message}, numero de repeticoes:${loops}`);
    await page.waitForSelector("._274yw");

    await page.waitForSelector("._3uMse");
    await page.click("._3uMse");

    if (loops) {
      for (let i = 0; i < loops; i++) {
        if (messages.length > 0) {
          messages.map(async (message, i) => {
            console.log(message);
            await page.type("._3uMse", message, { delay: 300 });
            await page.keyboard.press("Enter");
          });
        } else {
          await page.type("._3uMse", ` ${message}`, { delay: 100 });
          await page.keyboard.press("Enter");
        }
      }
    }
  } catch (error) {
    console.log("error:", error);
  }
}

initBot();
