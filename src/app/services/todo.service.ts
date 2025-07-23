import { inject, Injectable, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { TodoIdModel, TodoModel } from "../todo.model";
import { produce } from "immer";
import { from, map, Observable, of, switchMap, } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import {ajax} from 'rxjs/ajax';
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private http = inject(HttpClient);

    public getTodos() {
        return this.http.get<TodoModel[]>('http://localhost:3000/todos');
    }

    public getTodoById(id: TodoIdModel) {
        return this.http.get<TodoModel>('http://localhost:3000/todos/' + id);
    }

    // public getTodos() : Observable<TodoModel[]> {

    //     // const tmp = ajax({
    //     //     method: 'GET',
    //     //     url: 'http://localhost:3000/todos',
    //     //     responseType: 'json'
    //     // }).pipe(map(x => x.response as TodoModel[]))

    //     // const tmp = fromFetch('http://localhost:3000/todos', {selector: res => res.json() as Promise<TodoModel[]>});
    //     // return tmp;
    //     // return new Observable(o => {
    //     //     const ctrl = new AbortController();
    //     //     this._getTodos(ctrl.signal).then(d => o.next(d)).catch(e => o.error(e));
    //     //     return () => {
    //     //         ctrl.abort();
    //     //     }
    //     // });
    // }

    // private async _getTodos(signal: AbortSignal) {
    //     const res = await fetch('http://localhost:3000/todos', {signal});
    //     return await res.json() as Promise<TodoModel[]>
    // }


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
  ].map(({id, ...rest}) => ({id: `${id}`, ...rest}))

    public toggleTodo(todoId: string) {
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