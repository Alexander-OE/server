import { Schema, model } from "mongoose";
import { IUser } from "../../types/user.types";

const userSchema = new Schema<IUser>({
  googleId: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

export const User = model<IUser>("User", userSchema);
