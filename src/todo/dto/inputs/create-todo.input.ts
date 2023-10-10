import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

//We define the field that we expected to recibe when we creates a new todo 
@InputType()
export class CreateTodoInput {
  
  @Field(() => String, {
    description: "What needs to be done"
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  description: string

}