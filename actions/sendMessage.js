module.exports = {
  sendMessage: async (page, message) => {
    const inputMessage = "._3uMse";
    await page.waitForSelector(inputMessage);
    await page.type(inputMessage, message);
    await page.keyboard.press("Enter");
  },
};
