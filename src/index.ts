import "dotenv/config";
import express from "express";
import { Server } from "socket.io";
import connectDB from "./db";
import globalRouter from './global-router';
import { logger } from './logger';
import { createServer } from "node:http";
import cors from 'cors';

import { chatModel } from "./chat/models/chat";
 import mongoose from "mongoose";
 import { messageModel } from "./chat/models/message";
 import User from "./auth/models/User";

const app = express();


app.use(logger);
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow this origin
  methods: ['GET', 'POST'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Enable cookies
}));
app.use('/api/v1/',globalRouter);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

connectDB();


app.get("/send-notification-to-users", (req, res) => {
  const room = req.query.room as string;
  io.to("room-1").to("room-2").emit("hello", "world");
  res.send("Hello World");
});

app.get("/test-chat-creation", async (req, res) => {
  const message = await messageModel.create(
    {
      text: "Message",
      sender: new mongoose.Types.ObjectId("66682739f62b60a91759d211"),
      chat: new mongoose.Types.ObjectId("666828c4f62b60a91759d221"),
    }
  );

  chatModel.create({
    participants: [
      new mongoose.Types.ObjectId("66682739f62b60a91759d211"),
      new mongoose.Types.ObjectId("666828c4f62b60a91759d221"),
    ],
    lastMessage: message._id,
    
  })

  res.send("Chat Created");
})

app.get("/api/chats/:id", async (req, res) => {
  await User.countDocuments();

  const chatID = req.params.id;
  const chat = await chatModel
    .findById(chatID)
    .populate("participants")
    .populate("lastMessage");

  const messages = await messageModel.find({ chat: chat!.id });

  res.json({ chat, messages });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join-room", (room) => {
    console.log("joined room", room);
    socket.join(room);
  });
});

server.listen(3939, () => {
  console.log("server running at http://localhost:3939");
});
