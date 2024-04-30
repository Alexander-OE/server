import express, { Application } from "express";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToDB } from "./db/config";
dotenv.config();
import cors from "cors";

import authRoute from "./routes/auth";
import passport from "passport";
import setupRoutes from "./routes";

// require("./utils/passport");
const app: Application = express();

app.use(cors());
app.use(express.json())
app.use(
  session({
    secret: "dog",
    resave: false, // set resave option to false
    saveUninitialized: false, // set saveUninitialized option to false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));
setupRoutes(app);


const PORT = process.env.PORT || 3000;

function startUp() {
  try {
    connectToDB(process.env.MONGO_URI!);
    app.listen(PORT, () => console.log(`Server is starting at ${PORT}`));
  } catch (error) {
    console.error("Error starting up server:", error);
  }
}

startUp();
