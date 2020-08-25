import User, { IUser } from "../model/user";
import { Request, Response } from "express";

export const createUser = (req: Request, res: Response, username: string) => {
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
            console.log(`user ${user} created in mongoDB`);
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

export const getAllUser = (req: Request, res: Response) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
