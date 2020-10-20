const { sendMessage } = require("./sendMessage");

module.exports = {
  automaticMessages: async (page, lastMessage) => {
    console.log(lastMessage);
    switch (lastMessage) {
      case "Oi".toLocaleLowerCase():
        sendMessage(page, " Oi, tudo bem?");
        break;
      case "Tudo bem?":
        sendMessage(page, " Tudo e você?".toLocaleLowerCase());
        break;
      case "Tchau":
        sendMessage(page, " Tchau, até mais!".toLocaleLowerCase());
        break;
      default:
        false;
    }
  },
};
