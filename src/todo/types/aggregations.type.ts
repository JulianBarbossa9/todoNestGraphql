import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'Todo quick aggregations '})
export class AggregationsType {
  @Field(() => Int)
  total: number
  
  @Field(() => Int)
  pending: number
  
  @Field(() => Int)
  completed: number


  //whith deprecationReason show a message in apollo client tell this
  @Field(() => Int, { deprecationReason: 'Most use completed "total" instead'})
  totalTodos: number
}