import mongoose from "mongoose";
import { Schema, model, connect, Types } from "mongoose";

mongoose.connect("mongodb+srv://mohcodes:SitARam%40108@mlproject.yu0js.mongodb.net/SecBrain?retryWrites=true&w=majority&appName=MlProject")
const userSchema = new Schema({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const User = model('User', userSchema);

const contentSchema = new Schema({
    type: { type: String, required: false },
    link: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: "Tags" }],
    userRef: { type: Types.ObjectId, ref: "User", required: true },
});

export const Content = model('Content', contentSchema);

const tagSchema = new Schema({
    title: { type: String, required: true }
});

const Tags = model('Tags', tagSchema);

const linkSchema = new Schema({
    hash: { type: String, required: true, unique: true },
    userRef: { type: Types.ObjectId, ref: "User", required: true }
});

export const Links = model('Links', linkSchema);


