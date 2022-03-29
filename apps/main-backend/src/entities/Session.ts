import { Field, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Session {
  @Field()
    id!: number;
  
  @Field(() => User)
    user!: User;

  @Field()
    userAgent!: string;

  @Field(() => String)
    updatedAt: Date = new Date();

  @Field(() => String)
    createdAt: Date = new Date();
}
