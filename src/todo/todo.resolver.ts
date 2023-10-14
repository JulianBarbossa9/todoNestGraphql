
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  
  //This way the services are imported with nest
  constructor(
    private readonly todoService: TodoService
    
  ){}
  
  
  //We said to grapqhl that the type of return is of type Todo ./entity...
  @Query (() => [Todo], {
    name: 'todos',
    description: 'Return a small array of letters'
  })
  //This is typical of typescript
  findAll(
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll(statusArgs)
  }

  @Query(() => Todo, {
    name: 'todo',
    description: 'Return the id of the request Id',
  })
  findOne(
    @Args('id', { type: () => Int ,nullable: false}) id: number
  ): Todo {
    return this.todoService.findOne(id)
  }

  @Mutation(() => Todo, { 
    name: 'createTodo', 
    description: 'create a new todo'
  })
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput
  ){
    // console.log({createTodoInput})
   return this.todoService.createTodo(createTodoInput)
  }

  @Mutation(() => Todo, {
    name:'updateTodo',
    description: 'Update a todo'
  })
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
  ){
    return this.todoService.updateTodo(updateTodoInput)
  }

  @Mutation(() => Boolean)
  removeTodo(
    @Args('id', { type: ()=> Int}) id:number
  ){
    return this.todoService.removeTodo(id)
  }

  @Query(() => Int, { name: 'totalTodos'})
  totalTodos(): number {
    return this.todoService.totalTodos
  }

  @Query(() => Int, { name: 'totalTodosCompleted'})
  totalTodosCompleted(): number {
    return this.todoService.totalCompleted
  }

  @Query(() => Int, { name: 'totalTodosPending'})
  totalTodosPending(): number {
    return this.todoService.totalPending
  }

  //Another way to create totalTodos, totalTodosCompleted, totalTodosPending
  @Query(() => AggregationsType)
  //name of the method
  totalAggregationsTodos(): AggregationsType{
    return {
      completed: this.todoService.totalCompleted,
      pending: this.todoService.totalPending,
      total:this.todoService.totalTodos,
      totalTodos: this.todoService.totalTodos,
    }
  }

  
}
/**
 * Nota: The name of the param in the appollo client is the combination between the name of the query and the name of the param this is equal to todo + id = todoId 
 */
