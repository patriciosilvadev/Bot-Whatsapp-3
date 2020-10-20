const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// import { sendMessage } from "./actions/sendMessage";
const { sendMessage } = require("./actions/sendMessage");
const { searchContactString } = require("./actions/searchContact");
const { sendImage } = require("./actions/sendImage");
const { getMessages } = require("./actions/getMessages");
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8080);

async function initBot() {
  // await installMouseHelper(page);

  const contacts = ["Teste1", "Teste2"];
  const message = " Teste";
  const app = ".acGdi";
  const pathImage = `${process.cwd()}/teste.jpeg`;

  try {
    const browse = await puppeteer.launch({
      headless: false,
      // executablePath: "/opt/google/chrome/google-chrome",
      userDataDir: "./myUserDataDir",
      args: ["--user-data-dir=./myUserDataDir"],
    });
    const page = await browse.newPage();
    await page.goto(`https://web.whatsapp.com/`);

    await page.waitForSelector(app);

    if (contacts.length > 0) {
      for await (const contact of contacts) {
        await searchContactString(page, contact);
        await sendMessage(page, message);
        // await sendImage(page, pathImage, "Legenda");
      }
    }

    //ADICIONANDO OBSERVADOR, CHAMANDO CHATBOT SEMPRE QUE CHEGA NOVA MENSAGEM
    (async () => {
      await page.exposeFunction("puppeteerLogMutation", () => {
        getMessages(page);
        console.log(
          "Mutation Detected: A child node has been added or removed."
        );
      });

      await page.evaluate(() => {
        const target = document.querySelector(".z_tTQ");
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === "childList") {
              puppeteerLogMutation();
            }
          }
        });
        observer.observe(target, { childList: true });
        console.log(observer.observe(target, { childList: true }));
      });
    })();
  } catch (error) {
    console.log("error:", error);
  }
}
initBot();
