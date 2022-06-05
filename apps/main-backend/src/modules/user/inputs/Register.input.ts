import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { WithPassword } from './shared/WithPassword';

@InputType()
export class RegisterInput extends WithPassword {
  @Length(4, 255)
  @Field()
    username!: string;

  @IsEmail()
  @Field()
    email!: string;
}
