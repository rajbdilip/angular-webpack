import { Component, Input } from '@angular/core';

@Component({
  selector: 'filter-item-component',
  templateUrl: './filter-item.component.html',
  styleUrls:  ['./filter.component.scss']
})
export class FilterItemComponent {
  @Input('filterTitle') title: string;
  @Input() active: boolean = true;
}