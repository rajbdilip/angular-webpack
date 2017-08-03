import { NgModule }                 from '@angular/core';
import { HttpModule }               from '@angular/http';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { DataTableModule }          from 'ng2-data-table/lib/DataTableModule';
// framework
import { InputsModule }             from './../framework/inputs/inputs.module';
import { TextareasModule }          from './../framework/textareas/textareas.module';
import { AutoCompleteModule }       from './../framework/auto-complete/auto-complete.module';
import { AccordionModule }          from './../framework/accordion/accordion.module';
import { TabsModule }               from './../framework/tabs/tabs.module';
import { FilterModule }             from './../framework/filter/filter.module';
import { StickyPanelModule }        from './../framework/sticky-panel/sticky-panel.module';
import { DatePickerModule }         from './../framework/datepicker/datepicker.module';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    InputsModule,
    TextareasModule,
    AutoCompleteModule,
    AccordionModule,
    TabsModule,
    FilterModule,
    DatePickerModule,
    StickyPanelModule,
    DataTableModule
  ],
  exports: [
    HttpModule,
    CommonModule,
    FormsModule,
    InputsModule,
    TextareasModule,
    AutoCompleteModule,
    AccordionModule,
    TabsModule,
    FilterModule,
    DatePickerModule,
    StickyPanelModule,
    DataTableModule
  ]
})

export class SharedModule {
}