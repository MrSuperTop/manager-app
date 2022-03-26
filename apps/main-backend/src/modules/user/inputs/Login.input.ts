import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Length(1, 255)
  @Field()
    usernameOrEmail!: string;

  @Length(8, 2048)
  @Field()
    password!: string;
}
