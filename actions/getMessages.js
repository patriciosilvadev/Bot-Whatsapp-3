const { automaticMessages } = require("./automaticMessages");

module.exports = {
  getMessages: async (page) => {
    console.log("--- chatBot");
    const divMessages = "_274yw";

    await page.waitForSelector("." + divMessages);

    const messages = await page.evaluate(async () => {
      return await new Promise((resolve) => {
        const dialogs = document.getElementsByClassName("_274yw");
        const backup = [];
        for (dialog of dialogs) {
          if (dialog.children.length > 0) {
            if (dialog.children[0].textContent != undefined) {
              const who = dialog.children[0].getAttribute(
                "data-pre-plain-text"
              );
              const msg = dialog.children[0].textContent;
              backup.push({
                who: who,
                msg: msg,
              });
            }
          }
        }

        resolve(backup);
      });
    });
    const lastMessage = messages[messages.length - 1];
    automaticMessages(page, lastMessage.msg.toLowerCase());
  },
};
