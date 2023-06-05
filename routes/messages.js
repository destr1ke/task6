import express from "express";
import message from "../models/message.js";
import { connectedClients } from "../index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { recipient } = req.body;
  try {
    const messages = await message.find({ recipient }).sort({ createdAt: -1 });

    const messagesWithRecipient = await message.find({
      $or: [{ sender: recipient }, { recipient: recipient }],
    });
    const uniqueUserNames = messagesWithRecipient.reduce(
      (userNames, message) => {
        if (!userNames.includes(message.sender)) {
          userNames.push(message.sender);
        }
        if (!userNames.includes(message.recipient)) {
          userNames.push(message.recipient);
        }
        return userNames;
      },
      []
    );
    res.json({ messages, uniqueUserNames });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/create", async (req, res) => {
  const { sender, recipient, subject, text } = req.body;
  const createdAt = Date.now();
  try {
    const messageTemplate = new message({
      sender,
      recipient,
      subject,
      text,
      createdAt,
    });
    const createdMessage = await messageTemplate.save();

    connectedClients.forEach((client) => {
      client.send(JSON.stringify(createdMessage));
    });
    return res.json(createdMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
