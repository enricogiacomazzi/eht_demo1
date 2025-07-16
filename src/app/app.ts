import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, signal, untracked, ViewEncapsulation } from '@angular/core';

import { TodoModel } from './todo.model';

import { TodoList } from "./components/todo-list/todo-list";
import { TodoService } from './services/todo.service';
import { concat, concatMap, concatWith, debounceTime, delay, distinct, distinctUntilChanged, distinctUntilKeyChanged, EMPTY, filter, forkJoin, from, fromEvent, interval, map, merge, NEVER, Observable, of, range, single, Subscription, take, takeUntil, takeWhile, throttleTime, toArray } from 'rxjs';
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
export class App implements AfterViewInit {
  public pippo = false;
  private prom: Promise<any> | undefined;
  private obs$: Observable<any> | undefined;
  private sub: Subscription | undefined;
  private http = inject(HttpClient);


  ngAfterViewInit(): void {
    const txt = document.getElementById('txt') as HTMLInputElement;
    if(!txt) {
      return;
    }

    const obs2$ = fromEvent(txt, 'keyup').pipe(
      map((x: any) => x?.target?.value),
      debounceTime(800),
      distinct()
    );
    obs2$.subscribe(x => console.log('ciaoaaa', x));
  }

  public async btnHandler() {

    // this.prom = new Promise(res => {
    //   console.log('promise created');
    //   setTimeout(() => {
    //     res(42);
    //   }, 5000);
    // })

    // this.obs$ = fromEvent(document, 'click');


    this.obs$ = interval(500).pipe(
      takeWhile(x => x < 5),
      // filter(x => x < 5),
      map(x => x * 2),
      map(x => `ciao ${x}`),
      
    )


    // this.obs$ = new Observable(o => {
    //   console.log('observable created');
    //   let count = 0;
    //   const ptr = setInterval(() => {
    //     console.log('tick');
    //     if(count < 10000) {
    //       o.next(count++);
    //     } else {
    //       o.complete();
    //     }
    //   }, 500);

    //   return () => {
    //     clearInterval(ptr);
    //   }
    // });
    // const o1$ = of(1, 2, 4, 22).pipe(concatMap(x => {
    //     return from([x]).pipe(delay(1000))
    // }));

    // const o1$ = new Observable((o) => {
    //   o.next(42);
    //   o.next(55);
    //   //o.error('quello che mi pare');
    //   o.complete();   
    //   o.next(111);
  
    // });

    // // const o1$ = range(2, 15);
    // o1$.subscribe({
    //   next: (x) => {
    //     console.log('next', x);
    //   },
    //   error: e => {
    //     console.log('err', e);
    //   },
    //   complete: () => {
    //     console.log('obs completed')
    //   }
    // })
   }

   public btnHandler2() {
      // this.prom?.then(x => {
      //   console.log('ciao', x);
      // })

      this.sub = this.obs$?.subscribe({
        next: x => console.log('ciao', x),
        error: e => console.log('err', e),
        complete: () => console.log('completed')
      });
   }

    public btnHandler3() {
      const arr = interval(1000).pipe(map(x => `A${x}`), take(3));
      const arr2 = interval(765).pipe(map(x => `B${x}`), take(6));

      forkJoin({pippo: arr, pluto: arr2}).pipe(
      ).subscribe(x => {
        console.log(x);
      });

      // this.sub?.unsubscribe();
   }


  // public tick = signal<number>(0);
  // public click = signal<number>(0);

  // constructor() {
  //   setInterval(() => {
  //     this.tick.update(x => x + 1);
  //   }, 3000);

  //   document.addEventListener('click', () => {
  //     this.click.update(x => x + 1);
  //   });


  //   effect(() => {
  //     const count = untracked(() => this.click());
  //     console.log(`time: ${this.tick()}: ${count}`);
  //   })
  // }

  // private count = 0;


  // private delay(){
  //   return new Promise<void>((res, rej) => {
  //     setTimeout(() => res(), 2000);
  //   });
  // } 

  // private async dwldFilm(url: string) {
  //   const res = await fetch(url);
  //   await this.delay();
  //   return await res.json();
  // }

  // public async btnHandler() {

    

  //   const req = await fetch('https://swapi.info/api/films');
  //   const res = await req.json();
  //   const urls = res.map((z: any) => z.url);
  //   console.log('aaa', urls);

  //   const films: any[] = await Promise.all(urls.map((u: string) => this.dwldFilm(u)));

  //   console.log('films', films);

  //   // fetch('https://swapi.info/api/films')
  //   //   .then(x => x.json())
  //   //   .then(x => x.map((z: any) => z.url))
  //   //   .then(urls => urls.map((u: string) => fetch(u)
  //   //     .then(x => delay().then(() => x))
  //   //     .then(x => x.json())))
  //   //   .then(pro => Promise.all(pro))
  //   //   .then(x => {
  //   //     console.log('res', x);
  //   //   })

  //   // this.dwld('https://swapi.info/api/films', x => {
  //   //   const urls = x.map((z: any) => z.url);
  //   //   const films: any[] = [];
  //   //   for(const u of urls) {
  //   //     this.dwld(u, f => {
  //   //       films.push(f);
  //   //       if(films.length === urls.length) {
  //   //         console.log('films', films.length);
  //   //       }
  //   //     })
  //   //   }

  //   // })
  // }






















  private dwld(url: string, cb: (payload: any) => void) {
    fetch(url).then(x => x.json()).then(cb);
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
