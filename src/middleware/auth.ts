import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    const error = new Error("No token provided");
    return next(error);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded: any = verify(token, process.env.JWT_SECRET!);
    const { id, firstName, lastName, email } = decoded;
    req.user = { id, firstName, lastName, email };
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
