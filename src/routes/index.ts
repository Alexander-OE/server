import { Router, Response, Express } from "express";

const router = Router();

import authRouter from "./auth";

export default function setupRoutes(app: any) {
  app.get("/api", (req: Request, res: Response) => {
    res.send("yesssss");
  });

  app.use("/api", authRouter);
}
