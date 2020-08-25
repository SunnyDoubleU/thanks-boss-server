import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { IUser } from "./user";
import { IEvent } from "./event";

export interface ITransaction extends Document {
  title: string;
  payer: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  cost: number;
  currency: string;
  event: mongoose.Types.ObjectId;
}

const transactionSchema = new Schema({
  title: { type: String, required: true },
  payer: { type: mongoose.Types.ObjectId, ref: "user" },
  participants: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  cost: { type: Number },
  currency: { type: String },
  event: { type: mongoose.Types.ObjectId, ref: "event" },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
