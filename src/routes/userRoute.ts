import { Router, Request, Response, NextFunction } from "express";
import userController from "../controller/userController";
const router = Router();

router.get("/signin", (req: Request, res: Response) => {
  res.render("signin");
});
router.get("/signup", (req: Request, res: Response) => {
  res.render("signup");
});
router.post("/signin", userController.Login);
router.post("/signup", userController.Signup);

export default router;
