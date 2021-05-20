import { Service } from 'typedi';
import { Resolver, Query, Mutation, FieldResolver, Root, Args, Authorized, Ctx } from 'type-graphql';

import MessageEntity from '../entities/Message';
import UserEntity from '../entities/User';
import MessageService from '../services/Message';
import UserService from '../services/User';
import AddMessageArgs from '../args/AddMessage';
import { IContextType } from '../utils/interfaces';

@Service()
@Resolver(() => MessageEntity)
export default class Message {
  constructor(private readonly messageService: MessageService, private readonly userService: UserService) {}

  @Query(() => [MessageEntity])
  @Authorized()
  async messages(): Promise<MessageEntity[]> {
    return await this.messageService.getAll();
  }

  @FieldResolver(() => UserEntity)
  @Authorized()
  async user(@Root() message: MessageEntity): Promise<UserEntity> {
    return await this.userService.findById(message.userId);
  }

  @Mutation(() => MessageEntity)
  @Authorized()
  async addMessage(@Args() data: AddMessageArgs, @Ctx() ctx: IContextType): Promise<MessageEntity> {
    return await this.messageService.add(ctx.user.id, data.title);
  }
}
