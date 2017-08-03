import { Component }  from '@angular/core';

@Component({
  styleUrls: ['./datepicker.component.scss'],
  templateUrl: './datepicker.component.html'
})
export class DatePickerComponent {
    public currentDate: Date;
    private events: Array<any>;
    private tomorrow: Date;
    private minDate: Date = new Date();
    private afterTomorrow: Date;
    private formats: Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    private format = this.formats[0];
    private dateOptions: any = {
        formatYear: 'YY',
        startingDay: 1
    };
    private opened: boolean = false;

    constructor() {
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        this.events = [
            {date: this.tomorrow, status: 'full'},
            {date: this.afterTomorrow, status: 'partially'}
        ];
    }
    // set your date
    private setADate() {
        // this.currentDate = moment('2020-02-02', 'YYYY-MM-DD').toDate();
    }
    // get the current selected date
    public getDate(): number {
        return this.currentDate && this.currentDate.getTime() || new Date().getTime();
    }
    // set a new value to the current date
    private setToday() {
        this.currentDate = new Date();
    }

    private getDayClass(date: any, mode: string) {
        if (mode === 'day') {
            let dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (let i = 0; i < this.events.length; i++) {
                let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return this.events[i].status;
                }
            }
        }

        return '';
    }

    private disabled(date: Date, mode: string): boolean {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    }

    private open() {
        this.opened = !this.opened;
    }

    private clearTheCurrentDate() {
        this.currentDate = null;
    }

    private onFocus($event: any) {
        console.log('selected');
    }
}