import { Router, Request, Response, NextFunction } from "express";
const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index");
});

export default router;
