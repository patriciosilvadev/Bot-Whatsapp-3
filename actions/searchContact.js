module.exports = {
  searchContactString: async (page, contact) => {
    // -- SELETORES CSS *

    const inputSearchContact = "._3FRCZ";
    const titleText = `span[title="${contact}"]`;
    const newChat = "span[data-icon=chat]";

    const noMatchs = "._1_u2h _1W9ck";
    const matchedText = "'.matched-text'";

    //-- FUNCTIONS
    await page.click(newChat);
    await page.type(inputSearchContact, contact);
    await page.waitForSelector(titleText);
    await page.waitFor(200);
    await page.keyboard.press("Enter");
  },
};
