import { Request, Response, NextFunction } from "express";
import { User } from "../db/models/user";
import authService from "../services/auth.servcie";

export const Register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, confirmPassword, password } = req.body;
  try {
    const result = await authService.Register(
      firstName,
      lastName,
      email,
      confirmPassword,
      password
    );
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const result = await authService.Login(email, password);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    next(error);
  }
};
