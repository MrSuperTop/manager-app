import { IsUUID, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangePasswordInput {
  @IsUUID('4')
  @Field()
    token!: string;

  @Length(8, 2048)
  @Field()
    newPassword!: string;
}
