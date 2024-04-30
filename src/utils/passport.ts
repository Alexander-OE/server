import passport from "passport";
import { Request } from "express";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
  StrategyOptionsWithRequest,
} from "passport-google-oauth20";
import { User } from "../db/models/user";
import dotenv from "dotenv";
dotenv.config();

const options: StrategyOptionsWithRequest = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
  passReqToCallback: true, // This option tells Passport to pass the request object to the strategy callback function
  // Other options that depend on the incoming request can be added here
};

passport.use(
  new GoogleStrategy(options, function (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback
  ) {
    // console.log("profile is: " + JSON.stringify(profile));

    //check if user already exist in our db
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have the user
        console.log("user is" + currentUser);

        cb(null, currentUser);
      } else {
        new User({
          fullName: profile.displayName,
          googleId: profile.id,
        })
          .save()
          .then((newUser) => {
            console.log("new user created " + newUser);
            cb(null, newUser);
          });
      }
    });

    return cb(null, profile);
  })
);

passport.serializeUser(function (user, cb: VerifyCallback) {
  cb(null, user);
});

passport.deserializeUser(function (id: any, cb: VerifyCallback) {
  User.findById(id).then((user: any) => {
    cb(null, user);
  });
});
