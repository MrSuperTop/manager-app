import { AuthType } from '@prisma/client';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Session } from './Session';

registerEnumType(AuthType, {
  name: 'AuthType'
});

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

  @Field(() => AuthType)
    authType!: AuthType;

  @Field(() => String)
    updatedAt: Date = new Date();

  @Field(() => String)
    createdAt: Date = new Date();
}
