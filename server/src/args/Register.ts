import { Length, IsEmail, Validate } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import IsAvailableEmail from '../validation/is-available-email';

@ArgsType()
export default class Register {
  @Field()
  @Length(1, 50)
  name: string;

  @Field()
  @IsEmail()
  @Length(4, 75)
  @Validate(IsAvailableEmail)
  email: string;

  @Field()
  @Length(6, 75)
  password: string;
}
