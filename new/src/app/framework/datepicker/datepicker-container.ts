import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DateFormatter } from './moment-date-formatter';

const FORMAT_DAY = 'DD';
const FORMAT_MONTH = 'MMMM';
const FORMAT_YEAR = 'YYYY';
const FORMAT_DAY_HEADER = 'dd';
const FORMAT_DAY_TITLE = 'MMMM YYYY';
const FORMAT_MONTH_TITLE = 'YYYY';
const DATEPICKER_MODE = 'day';
const MIN_MODE = 'day';
const MAX_MODE = 'year';
const SHOW_WEEKS = true;
const ONLY_CURRENT_MONTH = false;
const STARTING_DAY = 0;
const YEAR_RANGE = 20;
const MIN_DATE: Date = null;
const MAX_DATE: Date = null;
const SHORTCUT_PROPAGATION = false;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const KEYS = {
    13: 'enter',
    32: 'space',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

@Component({
    selector: 'datepicker-inner',
    template: `
    <div [hidden]="!datepickerMode" class="well well-sm bg-faded p-a card" role="application" ><!--&lt;!&ndash;ng-keydown="keydown($event)"&ndash;&gt;-->
      <ng-content></ng-content>
    </div>
  `
})
export class DatePickerInnerComponent implements OnInit {
    @Input() public datepickerMode: string;
    @Input() public startingDay: number;
    @Input() public yearRange: number;
    public stepDay: any = {};
    public stepMonth: any = {};
    public stepYear: any = {};
    @Input() activeDate: Date;
    @Output() update: EventEmitter<Date> = new EventEmitter<Date>();

    private modes: Array<string> = ['day', 'month', 'year'];
    private dateFormatter: DateFormatter = new DateFormatter();
    private uniqueId: string;
    private _activeDate: Date;
    private selectedDate: Date;
    private _initDate: Date;
    private activeDateId: string;
    @Input() private minDate: Date;
    @Input() private maxDate: Date;
    @Input() private minMode: string;
    @Input() private maxMode: string;
    @Input() private showWeeks: boolean;
    @Input() private formatDay: string;
    @Input() private formatMonth: string;
    @Input() private formatYear: string;
    @Input() private formatDayHeader: string;
    @Input() private formatDayTitle: string;
    @Input() private formatMonthTitle: string;
    @Input() private onlyCurrentMonth: boolean;
    @Input() private shortcutPropagation: boolean;
    @Input() private customClass: any;
    @Input() private dateDisabled: any;
    @Input() private templateUrl: string;

    private refreshViewHandlerDay: Function;
    private compareHandlerDay: Function;
    private refreshViewHandlerMonth: Function;
    private compareHandlerMonth: Function;
    private refreshViewHandlerYear: Function;
    private compareHandlerYear: Function;

    @Input()
    private get initDate(): Date {
        return this._initDate;
    }

    private set initDate(value: Date) {
        this._initDate = value;
    }

     ngOnInit() {
        this.formatDay = this.formatDay || FORMAT_DAY;
        this.formatMonth = this.formatMonth || FORMAT_MONTH;
        this.formatYear = this.formatYear || FORMAT_YEAR;
        this.formatDayHeader = this.formatDayHeader || FORMAT_DAY_HEADER;
        this.formatDayTitle = this.formatDayTitle || FORMAT_DAY_TITLE;
        this.formatMonthTitle = this.formatMonthTitle || FORMAT_MONTH_TITLE;
        this.showWeeks = (this.showWeeks === undefined ? SHOW_WEEKS : this.showWeeks);
        this.onlyCurrentMonth = (this.onlyCurrentMonth === undefined ? ONLY_CURRENT_MONTH : this.onlyCurrentMonth);
        this.startingDay = this.startingDay || STARTING_DAY;
        this.yearRange = this.yearRange || YEAR_RANGE;
        this.shortcutPropagation = this.shortcutPropagation || SHORTCUT_PROPAGATION;
        this.datepickerMode = this.datepickerMode || DATEPICKER_MODE;
        this.minMode = this.minMode || MIN_MODE;
        this.maxMode = this.maxMode || MAX_MODE;

        this.uniqueId = 'datepicker-' + '-' + Math.floor(Math.random() * 10000);

        if (this.initDate) {
            this.activeDate = this.initDate;
        } else {
            this.activeDate = this.activeDate? this.activeDate : new Date();
        }
        this.selectedDate = new Date(this.activeDate.valueOf());
        this.refreshView();
    }

    public setCompareHandler(handler: Function, type: string) {
        if (type === 'day') {
            this.compareHandlerDay = handler;
        }

        if (type === 'month') {
            this.compareHandlerMonth = handler;
        }

        if (type === 'year') {
            this.compareHandlerYear = handler;
        }
    }

    public compare(date1: Date, date2: Date): number {
        if (this.datepickerMode === 'day' && this.compareHandlerDay) {
            return this.compareHandlerDay(date1, date2);
        }

        if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
            return this.compareHandlerMonth(date1, date2);
        }

        if (this.datepickerMode === 'year' && this.compareHandlerYear) {
            return this.compareHandlerYear(date1, date2);
        }

        return null;
    }

    public setRefreshViewHandler(handler: Function, type: string) {
        if (type === 'day') {
            this.refreshViewHandlerDay = handler;
        }

        if (type === 'month') {
            this.refreshViewHandlerMonth = handler;
        }

        if (type === 'year') {
            this.refreshViewHandlerYear = handler;
        }
    }

    public refreshView() {
        if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
            this.refreshViewHandlerDay();
        }

        if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
            this.refreshViewHandlerMonth();
        }

        if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
            this.refreshViewHandlerYear();
        }
    }

    public dateFilter(date: Date, format: string): string {
        return this.dateFormatter.format(date, format);
    }

    public fixTimeZone(date: Date) {
        let hours = date.getHours();
        date.setHours(hours === 23 ? hours + 2 : 0);
    }

    public select(date: Date) {
        if (this.datepickerMode === this.minMode) {
            if (!this.activeDate) {
                this.activeDate = new Date(0, 0, 0, 0, 0, 0, 0);
            }

            this.activeDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        } else {
            this.activeDate = date;
            this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
        }

        this.selectedDate = new Date(this.activeDate.valueOf());
        this.update.emit(this.activeDate);
        this.refreshView();
    }

    public move(direction: number) {
        let expectedStep: any;
        if (this.datepickerMode === 'day') {
            expectedStep = this.stepDay;
        }

        if (this.datepickerMode === 'month') {
            expectedStep = this.stepMonth;
        }

        if (this.datepickerMode === 'year') {
            expectedStep = this.stepYear;
        }

        if (expectedStep) {
            let year = this.activeDate.getFullYear() + direction * (expectedStep.years || 0);
            let month = this.activeDate.getMonth() + direction * (expectedStep.months || 0);
            this.activeDate.setFullYear(year, month, 1);
            this.refreshView();
        }
    }

    public toggleMode(direction: number) {
        direction = direction || 1;

        if ((this.datepickerMode === this.maxMode && direction === 1) ||
            (this.datepickerMode === this.minMode && direction === -1)) {
            return;
        }

        this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
        this.refreshView();
    }

    private isActive(dateObject: any): boolean {
        if (this.compare(dateObject.date, this.activeDate) === 0) {
            this.activeDateId = dateObject.uid;
            return true;
        }

        return false;
    }

    private createDateObject(date: Date, format: string): any {
        let dateObject: any = {};
            dateObject.date = date;
            dateObject.label = this.dateFilter(date, format);
            dateObject.selected = this.compare(date, this.selectedDate) === 0;
            dateObject.disabled = this.isDisabled(date);
            dateObject.current = this.compare(date, this.selectedDate) === 0;
        return dateObject;
    }

    private isDisabled(date: Date): boolean {
        // todo: implement dateDisabled attribute
        return ((this.minDate && this.compare(date, this.minDate) < 0) ||
        (this.maxDate && this.compare(date, this.maxDate) > 0));
    };

    private split(arr: Array<any>, size: number) {
        let arrays: Array<any> = [];
        while (arr.length > 0) {
            arrays.push(arr.splice(0, size));
        }
        return arrays;
    }

 }
