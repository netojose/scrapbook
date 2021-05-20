import { Length } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class DefinePassword {
  @Length(100)
  @Field()
  token: string;

  @Field()
  @Length(6, 75)
  password: string;
}
