import { Router } from 'express';
import MessageController from './message-controller';
import MessageService from './message-service';

const messageRouter = Router();
const messageService = new MessageService();
const messageController = new MessageController(messageService);

messageRouter.post('/messages/', messageController.createMessage);
messageRouter.get('/messages/', messageController.getMessages);
messageRouter.get('/messages/:id', messageController.getMessageById);
messageRouter.put('/messages/:id', messageController.updateMessage);
messageRouter.delete('/messages/:id', messageController.deleteMessage);
messageRouter.get('/messages/chat/:chatId', messageController.getMessagesByChatId);

export default messageRouter;