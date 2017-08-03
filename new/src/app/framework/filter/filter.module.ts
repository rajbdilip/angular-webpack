import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FilterComponent } from './filter.component';
import { FilterItemComponent } from './filter-item.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [FilterComponent, FilterItemComponent],
  exports: [FilterComponent, FilterItemComponent]
})

export class FilterModule {
}