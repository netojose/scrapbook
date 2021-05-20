import { Service } from 'typedi';
import { Resolver, Mutation, Args } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';

import UserService from '../services/User';
import AuthService from '../services/Auth';
import RegisterArgs from '../args/Register';
import DefinePasswordArgs from '../args/DefinePassword';
import ResetPasswordArgs from '../args/ResetPassword';
import LoginArgs from '../args/Login';

@Service()
@Resolver()
export default class Auth {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Mutation(() => String)
  async register(@Args() data: RegisterArgs): Promise<string> {
    const user = await this.userService.create(data.name, data.email, data.password);
    return this.authService.generateUserJWT(user);
  }

  @Mutation(() => String)
  async login(@Args() data: LoginArgs): Promise<string> {
    const user = await this.authService.getUserByCredentials(data.email, data.password);

    if (user === null) {
      throw new AuthenticationError('Wrong credentials');
    }

    return this.authService.generateUserJWT(user);
  }

  @Mutation(() => Boolean)
  async requestResetPassword(@Args() data: ResetPasswordArgs): Promise<boolean> {
    await this.authService.requestResetPassword(data.email);
    return true;
  }

  @Mutation(() => Boolean)
  async definePassword(@Args() data: DefinePasswordArgs): Promise<boolean> {
    return await this.authService.definePassword(data.token, data.password);
  }
}
