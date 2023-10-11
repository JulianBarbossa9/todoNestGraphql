import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Injectable()
export class TodoService {

  //We create a object similar to Todo
  private todos: Todo[] = [
    {id: 1, description: 'This the 1 description', done:false },
    {id: 2, description: 'This the 2 description', done:false },
    {id: 3, description: 'This the 3 description', done:true },
  ]

  findAll(statusArgs: boolean ): Todo[] {
    
    if (statusArgs) {
      this.todos = this.todos.filter(todo => todo.done === true)
      return this.todos
    }
    
    return this.todos
  }


  findOne(id: number):Todo {
    
    //Check if exist
    const todo = this.todos.find( todo => todo.id === id)
    //console.log(todo) //Return somethin like that { id: 3, description: 'This the 3 description', done: true } 

    if(!todo) throw new NotFoundException(`Todo with id: ${id} not found`) //404

    return todo
  }

  createTodo(createTodoInput: CreateTodoInput): Todo{
    
    const todo = new Todo()
    todo.description = createTodoInput.description
    todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1
    // console.log(...this.todos.map(todo => todo.id))
    
    this.todos.push(todo)
    return todo
  }

  // updateTodo(updataTodoInput: UpdateTodoInput) : Todo {
  updateTodo({ id, description, done }: UpdateTodoInput) : Todo {
    
    const todoToUpdate = this.findOne(id)
    console.log(todoToUpdate)

    if(description) todoToUpdate.description = description

    if (done !== undefined) todoToUpdate.done = done

    this.todos = this.todos.map( todo => {

      return (todo.id === id) ? todoToUpdate : todo
    })

    return todoToUpdate
  }

  removeTodo(id: number): Boolean{
    
    const todo = this.findOne(id)
    this.todos = this.todos.filter( todo => todo.id !== id )

    return true

  }

}
