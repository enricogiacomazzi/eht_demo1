import { Component, computed, input, output } from '@angular/core';
import { Modal } from '../../directives/modal';
import { TodoModel } from '../../todo.model';

@Component({
  selector: 'ng-todo-list-detail',
  imports: [Modal],
  templateUrl: './todo-list-detail.html',
  styleUrl: './todo-list-detail.scss'
})
export class TodoListDetail {
  todo = input.required<TodoModel | undefined>();
  show = computed(() => !!this.todo());
  close = output<void>();

}
