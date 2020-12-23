import User, { IUser } from "../model/user";
import { Request, Response } from "express";
// import bcrypt from 'bcrypt'
const bcrypt = require("bcrypt");

export const createUser = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(400).send("email taken");
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          // console.log(hash);
          if (err) {
            res.send(err.message);
          } else {
            User.create({
              email: email,
              password: hash,
            })
              .then((user: any) => {
                // res.set("Access-Control-Allow-Origin", "*");
                // res.set("Access-Control-Allow-Origin", "*");
                let { email, id } = user;
                let sessionData = { email, id };
                res.json(sessionData);
                console.log(sessionData);
                console.log(`user ${user.email} created in mongoDB`);
              })
              .catch((error) => {
                res.status(400).send(error);
                console.log(error);
              });
          }
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
