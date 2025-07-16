import { ChangeDetectionStrategy, Component, effect, inject, signal, untracked, ViewEncapsulation } from '@angular/core';

import { TodoModel } from './todo.model';

import { TodoList } from "./components/todo-list/todo-list";
import { TodoService } from './services/todo.service';
import { interval, map, single } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Modal } from './directives/modal';
import { MyFor } from './directives/my-for';
import { TemperaturePipe, toFahrenheit } from './pipes/temperature-pipe';
import { HttpPipe } from './pipes/http-pipe';
import { AccordionItem } from "./components/accordion-item/accordion-item";

@Component({
  selector: 'ng-root',
  imports: [TodoList, Modal, MyFor, TemperaturePipe, HttpPipe, AsyncPipe, JsonPipe, AccordionItem],
  providers: [TemperaturePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  public pippo = false;


  public tick = signal<number>(0);
  public click = signal<number>(0);

  constructor() {
    setInterval(() => {
      this.tick.update(x => x + 1);
    }, 3000);

    document.addEventListener('click', () => {
      this.click.update(x => x + 1);
    });


    effect(() => {
      const count = untracked(() => this.click());
      console.log(`time: ${this.tick()}: ${count}`);
    })
  }




  // public ciao = signal(42);

  // public inc() {
  //   this.ciao.set(this.ciao() + 1);
  // }

  // public dec() {
  //   this.ciao.update(x => x - 1);
  // }

  // public res() {
  //   this.ciao.set(0);
  //   this.ciao.set(2);
  //   this.ciao.set(4);
  // }


  // public render() {
  //   console.log('render');
  //   return '';
  // }
  // public count = 2;
  // public tmp = new Array(5).fill(0).map((_, i) => i);

  // public open = toSignal(interval(500).pipe(map(i => i % 2 === 0)));

  // private toFar = inject(TemperaturePipe);

  // constructor() {
  //   this.prova();
  // }


  // public prova() {
  //   const tc = 18;
  //   const far = this.toFar.transform(tc);

  //   console.log('far', far);

  // }
}
