"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("./database/models");
const config_1 = require("./config");
const middleware_1 = require("./middleware/middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield models_1.User.create({
            username: username,
            password: password
        });
        res.json({
            message: "User signed up."
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists."
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield models_1.User.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        res.json({
            message: "incorrect credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const link = req.body.link;
    //   @ts-ignore
    const userRef = req.userRef;
    try {
        yield models_1.Content.create({
            link: link,
            type: type,
            userRef: userRef
        });
        res.json({
            message: "Content Added"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Content not added"
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userRef = req.userRef;
    const content = yield models_1.Content.find({
        userRef: userRef
    }).populate("userRef", "username ");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  @ts-ignore 
    const userRef = req.userRef;
    //  @ts-ignore
    const contentId = req.body.ContentId;
    try {
        yield models_1.Content.deleteOne({
            contentId,
            userRef
        });
        res.json({
            message: "Content Deleted"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "You are not authorised to delete this."
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const hash = (0, utils_1.generateHash)(12);
    if (share) {
        yield models_1.Links.create({
            hash: hash,
            // @ts-ignore
            userRef: req.userRef
        });
        res.json({
            message: "Link Shared",
            hash
        });
    }
    else {
        res.json({
            message: "The link is not sharable."
        });
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield models_1.Links.findOne({
        hash: hash
    });
    if (!link) {
        res.status(411).json({
            message: "Not sharable"
        });
        return;
    }
    const content = yield models_1.Content.find({
        userRef: link.userRef
    });
    const user = yield models_1.User.findOne({
        _id: link.userRef
    });
    res.json({
        content,
        user
    });
}));
app.listen(3000);
