import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Tab } from './tab.component';
import { Tabs } from './tabs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [Tab, Tabs],
  exports: [Tab, Tabs]
})

export class TabsModule {
}