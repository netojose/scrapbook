import { Length, IsEmail } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class ResetPassword {
  @IsEmail()
  @Length(3, 75)
  @Field()
  email: string;
}
