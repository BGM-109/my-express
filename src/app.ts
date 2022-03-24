import express, { Application, Request, Response } from "express";

const schedule = require("node-schedule");
const connectDB = require("./db/db");
const port = process.env.PORT || 5000;
const app: Application = express();
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const rule = new schedule.RecurrenceRule();

rule.seconds = 0;

const job = schedule.scheduleJob(rule, function () {
  console.log("The answer to life, the universe, and everything!");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/search", (req: Request, res: Response) => {
  res.send();
});

app.listen(port, () => console.log(`App is listening on port ${port} !`));
