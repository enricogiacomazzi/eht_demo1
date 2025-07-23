import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, EventEmitter, inject, Inject, input, Input, Output, signal } from '@angular/core';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoIdModel, TodoModel } from '../../todo.model';
import { TodoService } from '../../services/todo.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { finalize, map, of, ReplaySubject, share, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
import { rxResource, takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TodoListDetail } from "../todo-list-detail/todo-list-detail";

@Component({
  selector: 'ng-todo-list',
  imports: [TodoListItemComponent, AsyncPipe, NgIf, JsonPipe, TodoListDetail],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoList {
  public ts = inject(TodoService);

  public todos = toSignal(this.ts.getTodos(), {initialValue: []});
  public todoCount = computed(() => this.todos().length);

  public show = signal(false);
  public select = signal<TodoIdModel | undefined>(undefined);

  public detail = toSignal(toObservable(this.select).pipe(
    switchMap(id => !id ? of(undefined) : this.ts.getTodoById(id))
  ), {initialValue: undefined});


  constructor() {
    setTimeout(() => {
      this.show.set(true);
    }, 1000);
  }


  todoChange(t: TodoModel) {
    this.ts.toggleTodo(t.id);

  } 

  render() {
    console.log('render');
    return '';
  }
}
