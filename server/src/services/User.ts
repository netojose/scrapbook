import { Service } from 'typedi';

import UserEntity from '../entities/User';
import UserById from '../dataloaders/UserById';

@Service()
export default class User {
  async findById(id: number): Promise<UserEntity> {
    return await UserById.load(id);
  }

  async create(name: string, email: string, password: string): Promise<UserEntity> {
    return await UserEntity.create({ name, email, password });
  }
}
