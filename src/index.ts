import express from "express";
import jwt from "jsonwebtoken";
import { User, Content, Links } from "./database/models"
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware/middleware";
import { generateHash } from "./utils";
const app = express();
app.use(express.json());


app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await User.create({
            username: username,
            password: password
        });

        res.json({
            message: "User signed up."
        })
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists."
        })
    }


});

app.post("/api/v1/signin", async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;


    const existingUser = await User.findOne({
        username: username,
        password: password
    });

    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRET);

        res.json({
            token
        })
    }
    else {
        res.json({
            message: "incorrect credentials"
        })
    }

});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const type = req.body.type;
    const link = req.body.link;
    //   @ts-ignore
    const userRef = req.userRef;

    try {
        await Content.create({
            link: link,
            type: type,
            userRef: userRef
        });

        res.json({
            message: "Content Added"
        })
    }
    catch (e) {
        res.status(500).json({
            message: "Content not added"
        });
    }

});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userRef = req.userRef;
    const content = await Content.find({

        userRef: userRef
    }).populate("userRef", "username ");
    res.json({
        content
    })
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    //  @ts-ignore 
    const userRef = req.userRef;
    //  @ts-ignore
    const contentId = req.body.ContentId;
    try {
        await Content.deleteOne({
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

});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    const hash = generateHash(12);
    if (share) {
        await Links.create({
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
        })
    }
});

app.get("/api/v1/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;

    const link = await Links.findOne({
        hash: hash
    });

    if (!link) {
        res.status(411).json({
            message: "Not sharable"
        });
        return;
    }
    const content = await Content.find({
        userRef: link.userRef
    });

    const user = await User.findOne({
        _id: link.userRef
    })

    res.json({
        content,
        user
    })
});

app.listen(3000);