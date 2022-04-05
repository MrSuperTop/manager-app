import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthUrls {
  @Field()
    google: string;

  @Field()
    github: string;
}
