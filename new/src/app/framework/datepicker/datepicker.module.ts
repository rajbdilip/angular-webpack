import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';
import { NgModule }                   from '@angular/core';
import { DatePickerComponent }        from './datepicker';
import { DatePickerInnerComponent }   from './datepicker-container';
import { DayPickerComponent }         from './daypicker';
import { MonthPickerComponent }       from './monthpicker';
import { YearPickerComponent }        from './yearpicker';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent],
  exports: [DatePickerComponent, DatePickerInnerComponent, DayPickerComponent, MonthPickerComponent, YearPickerComponent]
})

export class DatePickerModule {
}
