import { Table, PrimaryKey, AutoIncrement, Column, Index, Model, CreatedAt, BelongsTo } from 'sequelize-typescript';

import User from './User';

@Table({ updatedAt: false, tableName: 'password_resets' })
export default class PasswordReset extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @Index
  @Column
  public userId: number;

  @Column
  public token: string;

  @CreatedAt
  public createdAt: Date;

  @BelongsTo(() => User, 'userId')
  user: User;
}
