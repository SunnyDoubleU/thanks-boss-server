import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import { IUser } from "./user";
import { ITransaction } from "./transaction";

export interface IEvent /*extends Document*/ {
  title: string;
  participants: mongoose.Types.ObjectId[];
  transactions: mongoose.Types.ObjectId[];
}

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  participants: [
    { type: mongoose.Types.ObjectId, ref: "user", required: false },
  ],
  transactions: [
    { type: mongoose.Types.ObjectId, ref: "transaction", required: false },
  ],
});

const Event = mongoose.model(/*<IEvent>*/ "Event", eventSchema);
export default Event;
