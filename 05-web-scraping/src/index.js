import jsdom from "jsdom"
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"


const urlcanton ="https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales";
const urllaptop =	"https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(urlcanton, { waitUntil: "networkidle2" });
	await page.waitForSelector(".wikitable");
	const cantons = await page.$(".wikitable");
	const cantonsName = await page.$$(`.wikitable  a[title^="Canton"]`);
	const cantonsList = [];
	cantonsName.forEach(async (canton) => {
		const getInnerHTMLProperty = await canton.getProperty("innerHTML");
		const value = await getInnerHTMLProperty.jsonValue();
		cantonsList.push(value);
	});
	await cantons.screenshot({ path: "cantons.jpg" });
	await page.close();
	await browser.close();
	console.log(cantonsList);
})();

//webscrap

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(urllaptop);
	const price = await page.evaluate(() => {
		return Array.from(document.querySelectorAll(".thumbnail")).map(
			(article) => {
				const price = article.querySelector(".price").innerText;
				const title = article.querySelector(".title").title;
				const star = article.querySelector(".ratings > p:nth-child(2)").dataset
					.rating;
				return { price, star, title };
			}
		);
	});

	await page.close();
	await browser.close();
	console.log(price);
})();