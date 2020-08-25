import Event, { IEvent } from "../model/event";
import { Request, Response } from "express";
import { IUser } from "../model/user";
import * as mongoose from "mongoose";

export const createEvent = (req: Request, res: Response) => {
  const body: IEvent = req.body;
  const { title, participants } = body;

  const eventParams: IEvent = {
    title: title,
    participants: participants,
    transactions: [],
  };

  Event.create(eventParams)
    .then((event) => {
      res.json(event);
      console.log(`event ${event} created in mongoDB`);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

// export const updateEvent = (req: Request, res: Response) => {

// }

export const addTransactionToEvent = (transaction) => {
  const { event, _id } = transaction;
  console.log(event);
  if (_id) {
    Event.findByIdAndUpdate(event, {
      $push: { transactions: _id },
    })
      .then((event) => {
        console.log(`event ${event} Updated`);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    return "nothing to update";
  }
};

export const getAllEvents = (req: Request, res: Response) => {
  Event.find()
    .then((event) => {
      res.send(event);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

export const getOneEvent = (req: Request, res: Response) => {
  const _id = req.params.eventId;
  Event.findById({ _id })
    .populate([{ path: "participants", model: "User", select: "username" }])
    .populate([{ path: "transactions", model: "Transaction", select: "title" }]).exec()
    .then((event) => {
      res.send(event);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
