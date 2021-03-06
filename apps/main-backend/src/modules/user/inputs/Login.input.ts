import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { WithPassword } from './shared/WithPassword';

@InputType()
export class LoginInput extends WithPassword {
  @Length(4, 255)
  @Field()
    usernameOrEmail!: string;
}
