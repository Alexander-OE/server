import { Request, Response, NextFunction } from "express";

const validUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.id) {
    throw Error("User is invalid");
  }
  next();
};

export default validUser


