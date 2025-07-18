import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, signal, untracked, ViewEncapsulation } from '@angular/core';

import { TodoModel } from './todo.model';

import { TodoList } from "./components/todo-list/todo-list";
import { TodoService } from './services/todo.service';
import { concat, concatAll, concatMap, concatWith, debounceTime, delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, EMPTY, exhaustAll, exhaustMap, filter, forkJoin, from, fromEvent, interval, map, merge, mergeAll, mergeMap, NEVER, Observable, of, range, single, Subscription, switchAll, switchMap, take, takeUntil, takeWhile, throttleTime, toArray } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Modal } from './directives/modal';
import { MyFor } from './directives/my-for';
import { TemperaturePipe, toFahrenheit } from './pipes/temperature-pipe';
import { HttpPipe } from './pipes/http-pipe';
import { AccordionItem } from "./components/accordion-item/accordion-item";
import { HttpClient } from '@angular/common/http';

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
  private http = inject(HttpClient);
  private films$: Observable<any> | undefined;

  constructor() {
    this.films$ = this.http.get<any>('https://swapi.info/api/films/1').pipe(
      map(x => x.characters),
      concatMap(x => from(x as string)),
      exhaustMap((u: string) => this.http.get(u)),
      // exhaustMap(u => this.http.get(u)),
      toArray()
    );
    // .pipe(
    //   map(f => f.map(x => x.url)),

    //   map(urls => {
    //     console.log('ciaone', urls);
    //     return urls.map(u => this.http.get(u))
    //   }),
    //   mergeAll()
    // )
  }
  

  public btnHandler() {
    this.films$!.subscribe({
      next: x => console.log('data', x),
      error: e => console.log('err', e),
      complete: () => console.log('completed')
    });


    // this.films$!.subscribe(obs => {
    //   obs.subscribe((x: any) => {console.log(x)});
    // });

    // this.films$?.subscribe();
  }
}
