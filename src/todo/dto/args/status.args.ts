import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@InputType()
export class StatusArgs {
  //Validations

  @Field(() => Boolean, { 
    description: '',
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  sheckDone: boolean


}