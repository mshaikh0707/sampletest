import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class User {

  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field()
  companyName: string;

  @Field()
  companyUen: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  position: string;

  @Field()
  documents: string;
}
