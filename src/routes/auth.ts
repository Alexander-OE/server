import { Request, Response, NextFunction, Router } from "express";
const router = Router();
import passport from "passport";
import { Register } from "../controllers/auth.controller";

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  req.user ? next() : res.status(401).send("Unauthorized");
}

router.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.status(200).send("yo")
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/auth/protected",
    failureRedirect: "/api/auth/failure",
  })
);

router.get(
  "/protected",
  isLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    res.send("yes i'm in");
  }
);

router.get("/failure", (req: Request, res: Response, next: NextFunction) => {
  res.send("failed damn it");
});

router.get(
  "/logout",
  function (req: Request, res: Response, next: NextFunction) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.send("User logged out");
    });
  }
);

router.post("/register", Register);

export default router;
