import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, computed, effect, EventEmitter, inject, input, Input, OnChanges, OnDestroy, OnInit, output, Output, signal, SimpleChanges } from "@angular/core";
import { TodoModel } from "../../todo.model";
import { interval, Subscription } from "rxjs";
import { TodoService } from "../../services/todo.service";
import { Completed } from "../../directives/completed";


function toNumber(value: any) : number {
    return parseFloat(value);
}

@Component({
    selector: 'todo-list-item',
    templateUrl: 'todo-list-item.component.html',
    styleUrl: 'todo-list-item.component.scss',
    imports: [Completed],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListItemComponent {
    public todo = input.required<TodoModel>();
    public pippo = input.required<boolean>();
    public toggleTodo = output<void>();
    public done = computed(() => this.todo().done);
    public btnLabel = computed(() => this.done() ? 'da fare': 'completa');

    private e1 = effect(() => {
        if(this.todo().id === 2) {
            console.log('ciao');
        }
    });


    // pluto() {
    //     effect(() => {
    //         if(this.todo().id === 2) {
    //             console.log('ciao');
    //         }
    //     });
    // }

    public ts = inject(TodoService);


    // toggleTodo() {
    //     this.ts.toggleTodo(this.todo().id);
    // }
}