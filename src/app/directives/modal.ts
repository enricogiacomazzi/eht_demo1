import { Directive, effect, ElementRef, input } from '@angular/core';

@Directive({
  selector: '[ngModal]'
})
export class Modal {
  ngModal = input.required<boolean>();

  constructor(private el:ElementRef<HTMLDialogElement>) { 
    effect(() => {
      if(this.ngModal()) {
        this.el.nativeElement.showModal();
      } else {
        this.el.nativeElement.close();
      }
    })
  }
}
