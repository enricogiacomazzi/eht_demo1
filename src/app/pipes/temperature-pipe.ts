import { inject, Pipe, PipeTransform } from '@angular/core';
import { TodoService } from '../services/todo.service';

export function toFahrenheit(value: number) {
  return value * 1.8 + 32;
}


@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
  private ts = inject(TodoService);

  transform(value: number, decimal: number = 2, showUnits: boolean = false ): string {
    const far = toFahrenheit(value);
    return far.toFixed(decimal) + (showUnits ? ' °F' : '');
  }
}
