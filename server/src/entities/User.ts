import { ObjectType, Field } from 'type-graphql';
import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  Model,
  CreatedAt,
  HasMany,
  BeforeCreate
} from 'sequelize-typescript';

import Message from './Message';
import encryptPassword from '../utils/encryptPassword';

@ObjectType()
@Table({ updatedAt: false })
export default class User extends Model {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Field()
  @Column
  public name: string;

  @Field()
  @Column
  public email: string;

  @Column
  public password: string;

  @Field()
  @CreatedAt
  public createdAt: Date;

  @HasMany(() => Message, 'userId')
  messages: Message[];

  @BeforeCreate
  static async makeUpperCase(instance: User): Promise<void> {
    instance.password = await encryptPassword(instance.password);
  }
}
