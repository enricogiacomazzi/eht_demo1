import { Directive, TemplateRef, ViewContainerRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngMyFor]'
})
export class MyFor implements OnChanges {
  @Input({required: true}) ngMyForFrom!: number;
  @Input({required: true}) ngMyForTo!: number;  

  constructor(private vcr: ViewContainerRef, private tr: TemplateRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!this.vcr && !!this.tr) {
      this.vcr.clear();
      for(let i = this.ngMyForFrom; i <= this.ngMyForTo; i++) {
        this.vcr.createEmbeddedView<any>(this.tr, {$implicit: i});
      }
    }
  }

}
