import { Component, effect, input, output, signal } from '@angular/core';
import { MyFor } from '../../directives/my-for';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ng-ranking',
  imports: [MyFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Ranking,
      multi: true
    }
  ],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})
export class Ranking implements ControlValueAccessor {

  // value = input.required<number>();
  // valueChange = output<number>();

  public value = signal<number>(0);
  private onChange!: (value: number) => void;
  private onTouched!: () => void;


  public clickHandler(i: number) {
    this.onChange(i + 1);
    this.onTouched();
    this.value.set(i + 1);
  }

  writeValue(obj: any): void {
    if(Number.isInteger(obj)) {
      this.value.set(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
