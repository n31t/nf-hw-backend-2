import { Request, Response } from 'express';
import ChatService from './chat-service';

class ChatController {
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  createChat = async (req: Request, res: Response): Promise<void> => {
    try {
      const chat = req.body;
      const newChat = await this.chatService.createChat(chat);
      res.status(201).json(newChat);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  getChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const chats = await this.chatService.getAllChats();
      res.status(200).json(chats);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  getChatById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const chat = await this.chatService.getChat(id);
      if (!chat) {
        res.status(404).json({ message: 'Chat not found' });
        return;
      }
      res.status(200).json(chat);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  updateChat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const chatUpdate = req.body;
      const chat = await this.chatService.updateChat(id, chatUpdate);
      if (!chat) {
        res.status(404).json({ message: 'Chat not found' });
        return;
      }
      res.status(200).json(chat);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  deleteChat = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.chatService.deleteChat(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
}

export default ChatController;