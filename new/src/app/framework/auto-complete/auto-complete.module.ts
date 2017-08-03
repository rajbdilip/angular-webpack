import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AutoCompleteComponent } from './auto-complete.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent]
})

export class AutoCompleteModule {
}