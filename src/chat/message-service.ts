import { messageModel, IMessage } from './models/message';

class MessageService {
  async createMessage(message: IMessage): Promise<IMessage> {
    const newMessage = new messageModel(message);
    await newMessage.save();
    return newMessage;
  }

  async getMessage(id: string): Promise<IMessage | null> {
    return await messageModel.findById(id).exec();
  }

  async getAllMessages(): Promise<IMessage[]> {
    return await messageModel.find({}).exec();
  }

  async updateMessage(id: string, message: Partial<IMessage>): Promise<IMessage | null> {
    return await messageModel.findByIdAndUpdate(id, message, { new: true }).exec();
  }

  async deleteMessage(id: string): Promise<void> {
    await messageModel.findByIdAndDelete(id).exec();
    return;
  }
}

export default MessageService;