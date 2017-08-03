import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StickyPanelComponent } from './sticky-panel.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [StickyPanelComponent],
  exports: [StickyPanelComponent]
})

export class StickyPanelModule {
}