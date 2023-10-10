import { Field, InputType, Int } from "@nestjs/graphql";
import {  IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

//We define the field that we expected to recibe when we creates a new todo 
@InputType()
export class UpdateTodoInput {


  @Field(() => Int, {
    description: 'Id of the todo to update',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number
  
  @Field(() => String, {
    description: "What needs to be done",
    nullable: true //We say to graphql this field can be null
  })
  @IsString()
  @IsNotEmpty() 
  @MaxLength(20)
  @IsOptional()
  description?: string


  @Field(() => Boolean, {
    description: 'Show if the todo is completed or not',
    nullable: true, 
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean

}