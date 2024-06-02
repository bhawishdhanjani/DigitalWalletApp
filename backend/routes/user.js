const express = require("express");
const zod = require("zod");
const { User, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/middleware");

const userRouter = express.Router();

const userSignupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string().max(60),
  lastName: zod.string().max(60),
});

const userSigninSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const userUpdateSchema = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().max(60).optional(),
  lastName: zod.string().max(60).optional(),
});

userRouter.post("/signup", async (req, res) => {
  console.log("I am enterd at signup");
  const inputCheck = userSignupSchema.safeParse(req.body);
  if (!inputCheck.success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;
  await Accounts.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const inputCheck = userSigninSchema.safeParse(req.body);
  if (!inputCheck.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const userExit = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!userExit) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const token = jwt.sign({ id: userExit._id }, JWT_SECRET);
  res.json({
    token,
  });
});

userRouter.get("/getUser", authMiddleware, async (req, res) => {
  const userId = req.userId;
  let firstName = (
    await User.findOne({
      _id: userId,
    })
  ).firstName;
  let balance = (await Accounts.findOne({ userId })).balance.toFixed(2);

  res.json({
    firstName,
    balance,
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const inputCheck = userUpdateSchema.safeParse(req.body);
  if (!inputCheck.success) {
    return res.status(411).json({
      message: "Error while updating user.",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Update Successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find(
    {
      $or: [
        {
          firstName: { $regex: filter },
        },
        {
          lastName: { $regex: filter },
        },
      ],
    },
    "firstName lastName _id"
  );

  res.json({
    user: users,
  });
});

module.exports = {
  userRouter,
};
