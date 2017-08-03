import { CommonModule }             from '@angular/common';
import { NgModule }                 from '@angular/core';

import { CollapseDirective }        from './accordion-collapse.directive';
import { AccordionPanelComponent }  from './accordion-group.component';
import { AccordionComponent }       from './accordion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CollapseDirective, AccordionComponent, AccordionPanelComponent],
  exports: [CollapseDirective, AccordionComponent, AccordionPanelComponent]
})

export class AccordionModule {
}