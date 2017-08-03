import { Component, ContentChildren, QueryList, Input } from '@angular/core';
import { FilterItemComponent } from './filter-item.component';

@Component({
  selector: 'filter-component',
  templateUrl: './filter.component.html',
  styleUrls:  ['./filter.component.scss']
})
export class FilterComponent {
  @Input('placeholder') placeholder: string;
  @ContentChildren(FilterItemComponent) filterItem: QueryList<FilterItemComponent>;
  modal: string;
  filterList( selectedTab: FilterItemComponent ) {
    // deactivate all tabs
  }
  search(term: string): void {
    this.filterItem.toArray().forEach(filterItem =>
      filterItem.active = (filterItem.title.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }
}