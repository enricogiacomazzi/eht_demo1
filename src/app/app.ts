import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, signal, untracked, ViewEncapsulation } from '@angular/core';
import { TemperaturePipe, toFahrenheit } from './pipes/temperature-pipe';

import { AddUser } from "./components/add-user/add-user";
import { AddUser2 } from "./components/add-user2/add-user2";
import { ChangePassword } from "./components/change-password/change-password";

@Component({
  selector: 'ng-root',
  imports: [AddUser, AddUser2, ChangePassword],
  providers: [TemperaturePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  // counter = signal<number>(0);


  // constructor() {
  //   setInterval(() => {
  //     this.counter.update(x => x + 1);
  //   }, 1000);
  // }
}
