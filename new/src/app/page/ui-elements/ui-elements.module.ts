import { NgModule }               from '@angular/core';
import { SharedModule }           from './../../shared/shared.module';

import { UIElementsRouting }      from './ui-elements.routing';
import { UIElementsComponent }    from './ui-elements.component';
import { ColorComponent }         from './color/color.component';
import { FormComponent }          from './form/form.component';
import { TypographyComponent }    from './typography/typography.component';
import { ListsComponent }         from './lists/lists.component';
import { TablesComponent }        from './tables/tables.component';
import { AccordionComponent }     from './accordion/accordion.component';
import { TabsComponent }          from './tabs/tabs.component';
import { IconsComponent }         from './icons/icons.component';
import { DatePickerComponent }    from './datepicker/datepicker.component';
import { FilterDemoComponent }    from './filter/filter.component';
import { HelperClassComponent }   from './helper-class/helper-class.component';
import { LayoutComponent }        from './layout/layout.component';

// app services
import { ColorService }           from './../../shared/service/color.service';
import { TallyService }           from './../../shared/service/tally.service';

@NgModule({
  imports: [
    SharedModule,
    UIElementsRouting
  ],
  declarations: [
    UIElementsComponent,
    ColorComponent,
    FormComponent,
    TypographyComponent,
    ListsComponent,
    TablesComponent,
    AccordionComponent,
    TabsComponent,
    IconsComponent,
    DatePickerComponent,
    FilterDemoComponent,
    HelperClassComponent,
    LayoutComponent
  ],
  providers: [
    ColorService,
    TallyService
  ]
})
export class UIElementsModule {
}