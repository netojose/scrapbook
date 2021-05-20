import { ObjectType, Field } from 'type-graphql';
import { Table, PrimaryKey, AutoIncrement, Column, Index, Model, CreatedAt, BelongsTo } from 'sequelize-typescript';

import User from './User';

@ObjectType()
@Table({ updatedAt: false })
export default class Message extends Model {
  @Field()
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Field()
  @Index
  @Column
  public userId: number;

  @Field()
  @Column
  public title: string;

  @Field()
  @CreatedAt
  public createdAt: Date;

  @Field(() => User)
  @BelongsTo(() => User, 'userId')
  user: User;
}
