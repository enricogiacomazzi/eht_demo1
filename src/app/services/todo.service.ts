import { Injectable, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { TodoModel } from "../todo.model";
import { produce } from "immer";


@Injectable({
    providedIn: 'root'
})
export class TodoService {
    public todos: Array<TodoModel> = [
        {
        id: 1,
        text: 'fare la spesa',
        done: false
        },
        {
        id: 2,
        text: 'comprare il latte',
        done: true
        },
        {
        id: 3,
        text: 'fare aperitivo',
        done: false
        },
        {
        id: 4,
        text: 'comprare il latte',
        done: true
        },
        {
        id: 5,
        text: 'fare aperitivo',
        done: false
        }
  ];

    public toggleTodo(todoId: number) {
        this.todos = produce(this.todos, draft => {
            const todo = draft.find(x => x.id === todoId);
            if(todo) {
                todo.done = !todo.done;
            }
        });
        // this.todos = this.todos.map(t => t.id !== todoId ? t : {...t, done: !t.done});
        // const todo = this.todos.find(x => x.id === todoId);
        // if(todo) {
        //     todo.done = !todo.done;
        //     console.log('todos', todo);
        // }
    }
}