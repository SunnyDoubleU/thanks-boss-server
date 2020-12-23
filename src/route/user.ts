import * as express from "express";
import { Request, Response } from "express";
import { IUser } from "../model/user";
import { createUser, getAllUser } from "../controller/user";

const router = express.Router();

router.post("/createUser", (req: Request, res: Response) => {
  // const body: IUser = req.body;
  // const { email, password } = body;

  createUser(req, res);
});

router.get("/getAllUsers", (req: Request, res: Response) => {
  getAllUser(req, res);
});

module.exports = router;
