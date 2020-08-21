import * as express from "express";
import { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response, next) => {
  res.json({ title: "Express" });
});

module.exports = router;
