import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Length(1, 255)
  @Field()
    username!: string;

  @Length(8, 2048)
  @Field()
    password!: string;

  @IsEmail()
  @Field()
    email!: string;
}
