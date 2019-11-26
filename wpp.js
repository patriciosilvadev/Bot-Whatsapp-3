const puppeteer = require('puppeteer');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {

	res.sendFile(path.join(__dirname + '/index.html'));
});



app.post('/bot', function (req, res) {
	var link = req.body.linkGerado
	bot(link)
	res.end()
})

bot = async (link) => {
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
		userDataDir: '/Users/mac_multi/Library/Application Support/Google/Chrome'
	});
	const page = await browser.newPage();

	await page.goto(link)
	await page.waitFor('#action-button')
	await page.click('#action-button')

	await page.waitFor(4000)
	await page.click('._8ibw ._36or')
	await page.waitFor('.app')
	await page.keyboard.press('Enter');
	await page.waitFor('._2kYeZ')

	await page.click('span[data-icon=clip]')
	await page.waitFor('span[data-icon=image]')

	const [fileChooser] = await Promise.all([
		page.waitForFileChooser(),
		await page.click('span[data-icon=image]'),
	]);
	await fileChooser.accept(['/Users/mac_multi/Downloads/111.jpg']);
	await page.waitFor(2000)
	await page.keyboard.press('Enter')
	for (let i = 0; i < 10; i++) {
		await page.type('._13mgZ', 'Mensagem Automatica', { delay: 100 })
		await page.keyboard.press('Enter')
	}
};

app.listen(9000) //execucao do servidor


async function chamaRobo() {
	const browse = await puppeteer.launch({
		headless: false,
		executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
		userDataDir: '$HOME/Library/Application\ Support/Google/Chrome'
	});
	const page = await browse.newPage();
	await page.goto('http://localhost:9000/');
}

chamaRobo()