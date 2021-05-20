import { Service } from 'typedi';
import MessageEntity from '../entities/Message';

@Service()
export default class Message {
  async getAll(): Promise<MessageEntity[]> {
    return await MessageEntity.findAll();
  }

  async add(userId: number, title: string): Promise<MessageEntity> {
    return await MessageEntity.create({ userId, title });
  }
}
