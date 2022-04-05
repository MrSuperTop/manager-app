import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Session {
  @Field()
    id!: number;

  @Field()
    userAgent!: string;

  @Field(() => String)
    updatedAt: Date = new Date();

  @Field(() => String)
    createdAt: Date = new Date();
}
