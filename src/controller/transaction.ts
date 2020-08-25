import Transaction, { ITransaction } from "../model/transaction";
import { Request, Response } from "express";
import * as mongoose from "mongoose";
import { addTransactionToEvent } from "./event";

export const createTransaction = (req: Request, res: Response) => {
  const body = req.body;
  const { title, payer, participants, cost, currency, event } = body;
  if (title && payer && participants && cost && currency && event) {
    // const transactionParams = {
    //   title: title,
    //   payer: payer,
    //   participants: participants,
    //   cost: cost,
    //   currency: currency,
    //   event: event,
    // };
    Transaction.create({
      title: title,
      payer: payer,
      participants: participants,
      cost: cost,
      currency: currency,
      event: event,
    })
      .then((transaction) => {
        res.json(transaction);
        // console.log(`new transaction ${transaction} created in mongoDB`);
        addTransactionToEvent(transaction);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } else {
    res.json(`incomplete parameters`);
  }
};
