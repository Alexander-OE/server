import { hash, genSalt, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export async function hashedPassword(password: string) {
  const salt = await genSalt(saltRounds);
  return await hash(password, salt);
}

export async function comparePassword(
  inputPassword: string,
  hashedPassword: string
) {
  return await compare(inputPassword, hashedPassword);
}

export async function createJWT(user: {}) {
  const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "1h" });
  return token;
}

