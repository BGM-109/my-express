const axios = require("axios").default;
import cheerio from "cheerio";

const Scraper = (): number => {
  const website: string = "https://kream.co.kr/search";
  let sum: number = 0;
  let length = 0;
  try {
    axios(website).then((result: any) => {
      const data = result.data;
      const $ = cheerio.load(data);

      $(".product_info", data).each(function (this: any) {
        const title: string = $(this).find(".amount").first().text();
        const price: string = title.replace("원", "").replaceAll(",", "");
        sum += Number(price);
        length += 1;
      });
      const avg: number = sum / length;
      return avg;
    });
  } catch (error: any) {
    console.log(error, error.message);
  }
  return 0;
};

module.exports = Scraper;
