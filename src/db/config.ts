import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export function connectToDB(Mongo_URI: string) {
  mongoose
    .connect(Mongo_URI)
    .then(() => console.log(console.log(`connected to db`)))
    .catch((e) => console.log(`Database Error: ${e}`));
}
