import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TextareasComponent } from './textareas.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TextareasComponent],
  exports: [TextareasComponent]
})

export class TextareasModule {
}