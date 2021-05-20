import { Length, IsEmail } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class Login {
  @IsEmail()
  @Length(3, 75)
  @Field()
  email: string;

  @Field()
  password: string;
}
