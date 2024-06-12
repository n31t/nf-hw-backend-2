import { Request, Response } from 'express';
import MessageService from './message-service';
import { IMessage } from './models/message';

class MessageController {
  private messageService: MessageService;

  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const message: IMessage = req.body;
      const newMessage = await this.messageService.createMessage(message);
      res.status(201).json(newMessage);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const messages = await this.messageService.getAllMessages();
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  getMessageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const message = await this.messageService.getMessage(id);
      if (!message) {
        res.status(404).json({ message: 'Message not found' });
        return;
      }
      res.status(200).json(message);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  updateMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const messageUpdate: Partial<IMessage> = req.body;
      const message = await this.messageService.updateMessage(id, messageUpdate);
      if (!message) {
        res.status(404).json({ message: 'Message not found' });
        return;
      }
      res.status(200).json(message);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

  deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.messageService.deleteMessage(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }

    getMessagesByChatId = async (req: Request, res: Response): Promise<void> => {
        try {
        const { chatId } = req.params;
        const messages = await this.messageService.getMessagesByChatId(chatId);
        res.status(200).json(messages);
        } catch (error: any) {
        res.status(500).send({ error: error.message });
        }
    }
}

export default MessageController;