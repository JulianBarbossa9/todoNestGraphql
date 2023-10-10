
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Resolver()
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
  findAll(): Todo[] {
    return this.todoService.findAll()
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

}
/**
 * Nota: The name of the param in the appollo client is the combination between the name of the query and the name of the param this is equal to todo + id = todoId 
 */
