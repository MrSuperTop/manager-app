import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class OAuthRegisterInput {
  @Length(1, 255)
  @Field()
    username!: string;
}
