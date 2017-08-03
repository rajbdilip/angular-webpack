import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UIElementsComponent }  from './ui-elements.component';
import { ColorComponent }       from './color/color.component';
import { FormComponent }        from './form/form.component';
import { TypographyComponent }  from './typography/typography.component';
import { TabsComponent }        from './tabs/tabs.component';
import { FilterDemoComponent }  from './filter/filter.component';
import { ListsComponent }       from './lists/lists.component';
import { TablesComponent }      from './tables/tables.component';
import { AccordionComponent }   from './accordion/accordion.component';
import { IconsComponent }       from './icons/icons.component';
import { DatePickerComponent }  from './datepicker/datepicker.component';
import { HelperClassComponent } from './helper-class/helper-class.component';
import { LayoutComponent }      from './layout/layout.component';

const routes: Routes = [
  { path: '', component: UIElementsComponent, children: [
      { path: '', redirectTo: '/ui-elements/color', pathMatch: 'full' },
      { path: 'color', component: ColorComponent },
      { path: 'form', component: FormComponent },
      { path: 'typography', component: TypographyComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'filter', component: FilterDemoComponent },
      { path: 'accordion', component: AccordionComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'datepicker', component: DatePickerComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'icons', component: IconsComponent },
      { path: 'helper-class', component: HelperClassComponent },
      { path: 'layout', component: LayoutComponent }
    ]
  }
];

export const UIElementsRouting: ModuleWithProviders = RouterModule.forChild(routes);