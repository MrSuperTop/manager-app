import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class WithPassword {
  @Length(8, 2048)
  @Field()
    password!: string;
}
