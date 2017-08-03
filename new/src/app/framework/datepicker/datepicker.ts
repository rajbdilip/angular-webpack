import { forwardRef, Component, EventEmitter, Output, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import * as moment from 'moment';

const noop = () => {};
export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};
@Component({
    selector: 'date-picker',
    styleUrls:  ['./datepicker.scss'],
    template: `
    <div class="dbs-datepicker" #_eref>
      <input tabindex="-1" (focus)="onFocus($event)" [attr.value]="_displayDate">
      <span class="icon icon-calendar"></span>
      <datepicker-inner tabindex="-1" *ngIf="opened"
                        (update)="onUpdate($event)"
                        [activeDate]="activeDate"
                        [datepickerMode]="datepickerMode"
                        [initDate]="initDate"
                        [minDate]="minDate"
                        [maxDate]="maxDate"
                        [minMode]="minMode"
                        [maxMode]="maxMode"
                        [showWeeks]="showWeeks"
                        [formatDay]="formatDay"
                        [formatMonth]="formatMonth"
                        [formatYear]="formatYear"
                        [formatDayHeader]="formatDayHeader"
                        [formatDayTitle]="formatDayTitle"
                        [formatMonthTitle]="formatMonthTitle"
                        [startingDay]="startingDay"
                        [yearRange]="yearRange"
                        [customClass]="customClass"
                        [dateDisabled]="dateDisabled"
                        [onlyCurrentMonth]="onlyCurrentMonth"
                        [shortcutPropagation]="shortcutPropagation">
        <day-picker tabindex="0"></day-picker>
        <month-picker tabindex="0"></month-picker>
        <year-picker tabindex="0"></year-picker>
      </datepicker-inner>
    </div>
    `,
    providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})

export class DatePickerComponent implements ControlValueAccessor {
    private _displayDate: string;

    private _now: Date = new Date();
    private _value: Date = new Date();
    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: any) => void = noop;

    @Output() public focus: EventEmitter<any> = new EventEmitter();
    @Output() public update: EventEmitter<any> = new EventEmitter();
    @Input() public opened: boolean = false;
    @Input() public datepickerMode: string;
    @Input() public initDate: Date;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public minMode: string;
    @Input() public maxMode: string;
    @Input() public showWeeks: boolean;
    @Input() public format: string = 'DD-MM-YYYY';
    @Input() public formatDay: string;
    @Input() public formatMonth: string;
    @Input() public formatYear: string;
    @Input() public formatDayHeader: string;
    @Input() public formatDayTitle: string;
    @Input() public formatMonthTitle: string;
    @Input() public startingDay: number;
    @Input() public yearRange: number;
    @Input() public onlyCurrentMonth: boolean;
    @Input() public shortcutPropagation: boolean;
    @Input() public activeDate: Date;
    @ViewChild('_eref') _eref: ElementRef;
    // todo: change type during implementation
    public customClass: any;
    // todo: change type during implementation
    @Input() public dateDisabled: any;
    get value(): any { return this._value; };
    @Input() set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this.value = v;
        this._onChangeCallback(v);
      }
    }

    @HostListener('document:click', ['$event']) onClick(event: any) {
        if (!this._eref.nativeElement.contains(event.target)) {
          this.opened = false;
        }
      }

    private onUpdate(event: any) {
      this.update.emit(event);
      this.writeValue(event);
    }
    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    writeValue(value: any) {
      this._value = value;
      this._displayDate = value ? moment(value).format(this.format) : null;
      if (value === this.activeDate) {
        return;
      }
      if (value && value instanceof Date) {
        this.activeDate = value;
        return;
      }
      this.activeDate = value ? new Date(value) : null;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnChange(fn: any) {
      this._onChangeCallback = fn;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
    }

    onFocus($event: any) {
      this.opened = true;
      this.focus.emit($event);
    }
}
