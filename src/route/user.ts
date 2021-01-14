import * as express from "express";
import { Request, Response } from "express";
import { IUser } from "../model/user";
import { createUser, getAllUser, loginUser } from "../controller/user";

const router = express.Router();

router.post("/createUser", (req: Request, res: Response) => {
  // const body: IUser = req.body;
  // const { email, password } = body;

  createUser(req, res);
});

router.get("/getAllUsers", (req: Request, res: Response) => {
  getAllUser(req, res);
});

router.post("/loginUser", (req: Request, res: Response) => {
  loginUser(req, res);
});

router.get("/logoutUser", (req: any, res: Response) => {
  req.session.destroy();
  res.send("log out successful");
  console.log("log out success");
});
module.exports = router;
