import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { InputsComponent } from './inputs.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [InputsComponent],
  exports: [InputsComponent]
})

export class InputsModule {
}