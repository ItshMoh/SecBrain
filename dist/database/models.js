"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://mohcodes:SitARam%40108@mlproject.yu0js.mongodb.net/SecBrain?retryWrites=true&w=majority&appName=MlProject");
const userSchema = new mongoose_2.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.User = (0, mongoose_2.model)('User', userSchema);
const contentSchema = new mongoose_2.Schema({
    type: { type: String, required: false },
    link: { type: String, required: true },
    tags: [{ type: mongoose_2.Types.ObjectId, ref: "Tags" }],
    userRef: { type: mongoose_2.Types.ObjectId, ref: "User", required: true },
});
exports.Content = (0, mongoose_2.model)('Content', contentSchema);
const tagSchema = new mongoose_2.Schema({
    title: { type: String, required: true }
});
const Tags = (0, mongoose_2.model)('Tags', tagSchema);
const linkSchema = new mongoose_2.Schema({
    hash: { type: String, required: true, unique: true },
    userRef: { type: mongoose_2.Types.ObjectId, ref: "User", required: true }
});
exports.Links = (0, mongoose_2.model)('Links', linkSchema);
