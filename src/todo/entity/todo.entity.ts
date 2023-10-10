import { Field, Int, ObjectType } from "@nestjs/graphql";

//With this we say to graphql thi is a custom object
@ObjectType()
export class Todo {

  @Field(() => Int) //@Field(() => Int, { name: idTodo}) || we can change the name of the field
  id: number

  @Field(() => String)
  description: string

  @Field(() => Boolean)
  done: boolean = false
}