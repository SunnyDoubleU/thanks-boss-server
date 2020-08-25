import * as express from "express";
import { Request, Response } from "express";
import Transaction, { ITransaction } from "../model/transaction";
import { createTransaction } from "../controller/transaction";

const router = express.Router();

router.post("/createTransaction", (req: Request, res: Response) => {
  createTransaction(req, res);
});

module.exports = router;
