import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
    id!: number;

  @Field()
    username!: string;

  @Field()
    email!: string;

  @Field(() => String)
    updatedAt: Date = new Date();

  @Field(() => String)
    createdAt: Date = new Date();
}
