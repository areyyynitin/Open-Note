import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./src/models/database";
import { JWT_PASSWORD } from "./src/config";
import { UserMiddleware } from "./src/middleware";
import { random } from "./src/util";
import cors from "cors";
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

app.post("/api/v1/brain/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const note = new UserModel({
      username,
      password,
    });
    await note.save();
    res.status(200).json({ username, password });
  } catch (error) {
    console.log(error);
    res.status(411).json({ message: error });
  }
});

app.post("/api/v1/brain/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username, password });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );

    res.status(200).json({ message: token });
  } else {
    res.status(403).json({ message: "User not exist! Signup First" });
  }
});

app.post(
  "/api/v1/brain/content",
  UserMiddleware,
  async (req: Request, res: Response) => {
    const { link, type, title } = req.body;

    // @ts-ignore
    const userId = req.userId;
    try {
      const content = await ContentModel.create({
        link,
        type,
        title,
        userId,
        tags: [],
      });

      res.status(200).json({ message: content });
    } catch (err) {
      res.status(200).json({ message: "Content cannot added" });
    }
  }
);

app.get(
  "/api/v1/brain/content",
  UserMiddleware,
  async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.userId;
      const content = await ContentModel.find({
        userId: userId,
      }).populate("userId", "username");
      res.status(200).json({ content });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error,
      });
    }
  }
);

// app.delete(
//   "/api/v1/brain/content",
//   UserMiddleware,
//   async (req: Request, res: Response) => {
//     try {
//       const contentId = req.body.contentId;
//       await ContentModel.deleteMany({
//         contentId,
//         // @ts-ignore
//         userId: req.userId,
//       });

//       res.status(200).json({message:"Content Deleted"});
//     } catch (error) {
//       res.status(404).json({ Error: error });
//     }
//   }
// );


app.delete(
  "/api/v1/brain/content/:contentId",
  UserMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { contentId } = req.params;
      // @ts-ignore
      await ContentModel.deleteOne({ _id: contentId, userId: req.userId });

      res.status(200).json({ message: "Content Deleted" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }
);


app.post("/api/v1/brain/share", UserMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({
      // @ts-ignore
      userId: req.userId,
    });

    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }
    const hash = random(10);
    await LinkModel.create({
      // @ts-ignore
      userId: req.userId,
      hash: hash,
    });

    res.json({ hash });
  } else {
    await LinkModel.deleteOne({
      // @ts-ignore
      userId: req.userId,
    });
    res.json({ message: `removed link` });
  }
});

app.get("/api/v1/brain/:sharelink", async (req: Request, res: Response) => {
  const hash = req.params.sharelink;
  const link = await LinkModel.findOne({
    hash: hash,
  });
  if (!link) {
    res.status(411).json({ message: "Soory! Incorrect input" });
    return;
  }

  // userId
  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(411).json({
      message: `User not found, error should ideally not happen ${user}`,
    });
    return;
  }

  res.json({
    username: user.username,
    content: content,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error))
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to localhost:${port}`);
    });
  });
