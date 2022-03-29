import { Field, ObjectType } from 'type-graphql';
import { Session } from './Session';

@ObjectType()
export class User {
  @Field()
    id!: number;

  @Field()
    username!: string;

  @Field()
    email!: string;
  
  @Field(() => [Session])
    sessions!: Session[];

  @Field()
    emailConfirmed!: boolean;

  @Field(() => String)
    updatedAt: Date = new Date();

  @Field(() => String)
    createdAt: Date = new Date();
}
