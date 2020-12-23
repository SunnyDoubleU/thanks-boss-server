import { Schema, Document } from "mongoose";
import * as mongoose from "mongoose";
// import bcrypt from 'bcryptjs';

export interface IUser /* extends Document*/ {
  email: string;
  password: string;
  // role: string;
  // isValidPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  // role: { type: String, required: true },
});

// userSchema.methods.isValidPassword = async function (password: string) {
//     const user = this;
//     const result = await bcrypt.compare(password, user.password);
//     return result;
// };

const User = mongoose.model(/*<IUser>*/ "User", userSchema);
export default User;
