import * as bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mime from "mime-types";
import morgan from "morgan";
import { createLogger, format, transports } from "winston";
import * as routes from "./routes";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

app.use(morgan("common"));

// use text parser middlware
app.use(bodyParser.text());

// use json form parser middlware
app.use(bodyParser.json());

// use query string parser middlware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// use raw parser middlware
app.use(
  bodyParser.raw({
    type: mime.lookup(".pdf").toString()
  })
);

export const logger: any = createLogger({
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss"
    }),
    format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message}` +
        (info.splat !== undefined ? `${info.splat}` : " ")
    )
  ),
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transports: [new transports.Console()]
});

// Configure routes
routes.register(app);

// start the Express server
app.listen(port, () => {
  logger.info(`Running in ${process.env.NODE_ENV} mode`);
  logger.info(`server started at http://localhost:${port}`);
});
