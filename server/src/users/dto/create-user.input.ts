import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';
@InputType()
export class CreateUserInput {

  @Field()
  name: string;

  @Field()
  companyName: string;

  @Field()
  companyUen: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsPhoneNumber("SG")
  phoneNumber: string;

  @Field()
  position: string;

  @Field(type => [String])
  documents: string[];

}
