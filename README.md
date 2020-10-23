# Automation for whatsapp-web.
- [x] Send messages and photos to one or several contacts automatically.
- [x] Set automatic responses with the chatbot scheme.
- [ ] Schedule a time for your messages to be sent.
- [ ] Contribute to the project =)

# Running the project:
1. Being in the Bot-Whatsapp/Service directory with the [Node](https://nodejs.org/en/) installed on your machine, run the command **yarn** or **npm install** in your terminal to install the project dependencies.

2. In your terminal run the command **yarn dev** to start the bot.

3. If is your first time running the project, you need scan the QR code in the browser

# Project settings:
- To keep a whatsapp session open, I create a folder called **"myUserDataDir"** in the Service folder, where the user data of the browser that the bot is using will be, otherwise whatsapp-web will always ask for a QR Code for start a session.

## In index.js we have some variables that define the behavior of the bot
- **contacts**: an array that defines which contacts the automatic messages will be sent to, each index in the array is a contact, which may be the name saved in your phonebook or the desired contact number
- **message**: a string that defines the message to be sent
- **pathImage**: path of the image you want to send

# Actions
- **sendMessage(page:[Page](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-page), message: String);** <br />
writes and sends the string received in the current chat.

- **sendImagem(page:[Page](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-page), pathImage: String, lyric: String);** <br />
receives the image path and its caption (optional) and sends the image in the current chat.

- **getMessages(page:[Page](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-page));**<br />
captures the messages of the current chat and calls the chatBot passing the last chat message as an argument. <br />
_this function is usually only called when some change changes the gift, in the messages div, to check if the chatBot needs to answer something_

- **automaticMessages(page:[Page](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-page), lastMessage: String)**;
function called by getMessages (), receives the last chat message and checks if there is any predefined dialog for the message, you can configure manual response routines in this function, while we do not have a front end.

- **searchContact(page:[Page](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-page), contact: String);** <br />
receives a contact and looks it up in the contact list, when you find it opens his chat


# Example searching and sending messages automatically

![sendTeste](https://user-images.githubusercontent.com/48760214/96983639-963ca800-14f6-11eb-9137-7db22ed52037.gif)
