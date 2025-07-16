import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Inject, input, Input, Output } from '@angular/core';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TodoModel } from '../../todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'ng-todo-list',
  imports: [TodoListItemComponent],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoList {
  public pippo = input.required<boolean>();
  public ts = inject(TodoService);


  todoChange(t: TodoModel) {
    this.ts.toggleTodo(t.id);

  } 

  render() {
    console.log('render');
    return '';
  }
}
