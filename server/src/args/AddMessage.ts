import { MaxLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class AddMessage {
  @MaxLength(255)
  @Field()
  title: string;
}
