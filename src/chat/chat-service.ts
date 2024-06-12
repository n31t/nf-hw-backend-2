import mongoose from 'mongoose';
import { chatModel, IChat } from './models/chat';

class ChatService {
  async createChat(chat: Omit<IChat, 'lastMessage'> & { lastMessage?: mongoose.Types.ObjectId }): Promise<IChat> {
    const newChat = new chatModel({
      ...chat,
      lastMessage: chat.lastMessage || '',
    });
    await newChat.save();
    return newChat;
  }

  async getChat(id: string): Promise<IChat | null> {
    return await chatModel.findById(id).exec();
  }

  async getAllChats(): Promise<IChat[]> {
    return await chatModel.find({}).exec();
  }

  async updateChat(id: string, chat: Partial<IChat>): Promise<IChat | null> {
    return await chatModel.findByIdAndUpdate(id, chat, { new: true }).exec();
  }

  async deleteChat(id: string): Promise<void> {
    await chatModel.findByIdAndDelete(id).exec();
    return;
  }
}

export default ChatService;