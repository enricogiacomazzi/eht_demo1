import { Directive, ElementRef, Inject, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngCompleted]'
})
export class Completed implements OnChanges {
  @Input({required: true }) done!: boolean;
  
  constructor(private el:ElementRef) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    const elem = (this.el.nativeElement as HTMLElement);
    if(!!elem) {
      elem.style.textDecoration = !!this.done ? 'line-through' : '';
    }
  }

}
