const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/bot", function (req, res) {
  var link = req.body.linkGerado;
  bot(link);
  console.log(link);
  res.end();
});

async function getNumber(page) {
  await page.goto("http://localhost:9000/");
  await page.click("#nmr");
  await page.type("#nmr", "11942395212", { delay: 100 });
  console.log("---- numero digitao");
  await page.click("#botao");
  await page.click("#botaoacessar");
}

bot = async (link) => {
  //   console.log(link);
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/opt/google/chrome/google-chrome",
    userDataDir: "/home/gabriel/.config/google-chrome/Default",
    //   /home/gabriel/.config/google-chrome/Default
  });

  const page = await browser.newPage();
  await page.goto(link);
  await page.click("#action-button");
  setTimeout(() => {}, 3000);
  await console.log("---- wpp page");
  console.log(link);
  //   await page.waitFor("#nmr");
  //   console.log(page.waitFor("#id"));
  //   await page.waitFor("#id");
  //   console.log(page.waitFor("#id"));
  //   await page.click("#nmr");
  //   await page.type("#nmr", "11942395212", { delay: 100 });
  //   await page.click("#botao");
  //   await page.waitFor("#botaoacessar");
  //   await page.click("#botaoacessar");
  //   await page.waitFor(4000);
  //   await page.click("._3FRCZ .copyable-text .selectable-text");
  //   await page.waitFor(".app");
  //   await page.keyboard.press("Enter");
  //   await page.waitFor("._2kYeZ");
  //   await page.click("span[data-icon=clip]");
  //   await page.waitFor("span[data-icon=image]");
  //   const [fileChooser] = await Promise.all([
  //     page.waitForFileChooser(),
  //     await page.click("span[data-icon=image]"),
  //   ]);
  //   //   await fileChooser.accept(["/Users/mac_multi/Downloads/111.jpg"]);
  //   await page.waitFor(2000);
  //   await page.keyboard.press("Enter");
  //   for (let i = 0; i < 10; i++) {
  //     await page.type("._13mgZ", "Mensagem Automatica", { delay: 100 });
  //     await page.keyboard.press("Enter");
  //   }
};

app.listen(9001); //execucao do servidor

async function chamaRobo() {
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

chamaRobo();
