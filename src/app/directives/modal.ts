import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngModal]'
})
export class Modal implements OnChanges {
  @Input({required: true}) ngModal!: boolean;

  constructor(private el:ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.el) {
      return;
    }

    const dialog = this.el.nativeElement as HTMLDialogElement;

    if(this.ngModal) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }

}
