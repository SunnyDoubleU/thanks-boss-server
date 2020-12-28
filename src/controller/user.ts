import User, { IUser } from "../model/user";
import { Request, Response } from "express";
// import bcrypt from 'bcrypt'
const bcrypt = require("bcrypt");

export const createUser = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(400).send("email taken");
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.send(err.message);
          } else {
            User.create({
              firstName,
              surname,
              email,
              password: hash,
            })
              .then((user: any) => {
                let { firstName, surname, email, id } = user;
                let sessionData = { firstName, surname, email, id };
                res.json(sessionData);
                console.log(sessionData);
                console.log(`user ${user.firstName} created in mongoDB`);
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

export const loginUser = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  console.log(req.body);
  User.findOne({ email: email })
    .then((user: any) => {
      if (user) {
        bcrypt.compare(password, user.password, (error, equal) => {
          if (equal) {
            let { email, firstName, surname, id } = user;
            let sessionData = { email, firstName, surname, id };
            res.json(sessionData);
            console.log(`user ${email} logged in`);
          } else {
            res.status(400).send(error);
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
