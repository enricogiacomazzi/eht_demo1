import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-accordion-item',
  imports: [],
  templateUrl: './accordion-item.html',
  styleUrl: './accordion-item.scss'
})
export class AccordionItem {
  @Input() title: string = 'Title';
  public isOpen = true;
}
