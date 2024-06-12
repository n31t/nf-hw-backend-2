import { Router } from "express";
import ChatController from "./chat-controller";
import ChatService from "./chat-service";

const chatRouter = Router();

const chatService = new ChatService();
const chatController = new ChatController(chatService);

chatRouter.post("/chats/", chatController.createChat)
chatRouter.get("/chats/", chatController.getChats)
chatRouter.get("/chats/:id", chatController.getChatById)
chatRouter.put("/chats/:id", chatController.updateChat)
chatRouter.delete("/chats/:id", chatController.deleteChat)

export default chatRouter;