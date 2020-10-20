module.exports = {
  sendImage: async (page, pathImage, lyric) => {
    console.log("send image");
    try {
      if (pathImage) {
        const sendImageIcon = "span[data-icon=attach-image]";
        const clipIcon = "div[title=Anexar]";
        const sendIcon = "span[data-icon=send]";

        await page.waitForSelector(clipIcon);
        await page.click(clipIcon);
        await page.waitForSelector(sendImageIcon);
        await page.click(sendImageIcon);
        const [fileChooser] = await Promise.all([
          page.waitForFileChooser(),
          await page.click(sendImageIcon),
        ]);
        await fileChooser.accept([pathImage]);
        await page.waitForSelector(sendIcon);

        // if (lyric) {
        //   await page.keyboard.type(lyric);
        // }

        await page.keyboard.press("Enter");
      } else {
        console.log("PathImage = undefined");
        return false;
      }
    } catch (error) {
      console.log("error:" + error);
    }
  },
};
