import { IsUUID, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ConfirmEmailInput {
  @IsUUID('4')
  @Field()
    token!: string;

  @Length(6)
  @Field()
    code!: string;
}
