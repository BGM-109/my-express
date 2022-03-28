import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
const asyncHandler = require("express-async-handler");
const schedule = require("node-schedule");
const connectDB = require("./db/db");
const port = process.env.PORT || 5000;
const app: Application = express();
const axios = require("axios").default;
import cheerio from "cheerio";

dotenv.config();

connectDB();

const Price = require("./model/priceModel");

const job = schedule.scheduleJob("0 0 0 */1 * *", async function () {
  console.log(`크론 실행 되었습니다.`);

  console.log("스크랩시작");
  const website: string = "https://kream.co.kr/search";
  let sum: number = 0;
  let length = 0;
  let avg: number = 0;
  try {
    axios(website).then(async (result: any) => {
      const data = result.data;
      const $ = cheerio.load(data);

      $(".product_info", data).each(function (this: any) {
        const title: string = $(this).find(".amount").first().text();
        const price: string = title.replace("원", "").replaceAll(",", "");
        sum += Number(price);
        length += 1;
      });
      avg = sum / length;
      console.log(`스크랩 완료 ${avg}`);
      if (avg != 0) {
        const price = await Price.create({
          price: avg,
        });
        console.log(`${price}}`);
      }
    });
  } catch (error: any) {
    console.log(error, error.message);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/api/prices", require("./routes/priceRouter"));

app.get(
  "/prices",
  asyncHandler(async (req: Request, res: Response) => {
    const prices = await Price.find();

    res.status(200).json(prices);
  })
);

app.listen(port, () => console.log(`App is listening on port ${port} !`));
