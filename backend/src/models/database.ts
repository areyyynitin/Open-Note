import mongoose, { Schema, model, Types } from "mongoose";
import { types } from "util";

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, unique: true },
});


const ContentSchema = new Schema({
  title: { type: String },
  link: { type: String},
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type:String,
  userId: { type: mongoose.Types.ObjectId, ref: "UserSchema", required: true }
});

const LinkSchema = new Schema({
  hash:String,
  userId: { type: mongoose.Types.ObjectId, ref: "UserSchema", required: true , unique:true },
});

export const UserModel = model("UserSchema", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links" , LinkSchema)
