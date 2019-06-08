import * as express from "express";
import { logger } from "../index";

export const register = (app: express.Application) => {

  app.get("/getExample", (req: any, res) => {
    const queryExample: string = req.query.queryExample;
    logger.info(`Get example ${queryExample}`);
    res.json({ queryExample });
  });

  app.post("/postExample", (req: any, res) => {
    const bodyExample: any = req.body;
    logger.info(`Post example ${bodyExample}`);
    res.json({ bodyExample });
  });

};
