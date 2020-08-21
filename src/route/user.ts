import * as express from "express";
import { Request, Response } from "express";
import User, { IUser } from "../model/user";

const router = express.Router();

router.post("/createUser", (req: Request, res: Response) => {
  const body: IUser = req.body;
  const { username } = body;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.status(400).send("username taken");
      } else {
        User.create({
          username: username,
        })
          .then((user) => {
            res.json(user);
            console.log(`user ${user} created on mongoDB`);
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
