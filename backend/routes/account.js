const express = require("express");
const { authMiddleware } = require("../middleware/middleware");
const { Accounts, User } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Accounts.findOne({
    userId,
  });

  const balance = account.balance;
  return res.json({ balance });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const { to, amount } = req.body;
  const userId = req.userId;
  const session = await mongoose.startSession();
  session.startTransaction();

  const userAccount = await Accounts.findOne({ userId });
  if (userAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Accounts.findOne({
    userId: to,
  });

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Accounts.updateOne(
    {
      userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Accounts.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = {
  accountRouter,
};
