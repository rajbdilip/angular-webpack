import { forwardRef, Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

const noop = () => {};
export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoCompleteComponent),
  multi: true
};

@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls:  ['./auto-complete.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AutoCompleteComponent implements ControlValueAccessor {
  @Input('searchdata') searchdata: Array<any>;
  @Input('placeholder') placeholder: string;
  @Input('maxlength') maxlength: string;
  @Input() offautoclear: boolean = false;
  @Input() class: string;
  @Input() label: string = '';
  @Output() onSelect = new EventEmitter<any>();
  @Input() _value: any;
  @ViewChild('input') _inputElement: ElementRef;
  searchString: string = '';
  selected: boolean = false;
  validResult: Array<string> = [];

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  get empty() { return (this._value == null || this._value === ''); }
  get value(): any { return this._value; };
  @Input() set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.value = v;
      this.updateLabel(v);
      this._onChangeCallback(v);
    }
  }

  search(term: string): void {
    this.validResult = this.searchStringInArray(term, this.searchdata);
  }

  select(item: any) {
    this.value = item;
    this.onSelect.emit(item);
    this.selected = true;
    this._inputElement.nativeElement.blur();
  }

  updateLabel(item: any) {
    this.validResult = [];
    this.label = item ? item.label : '';
    this.placeholder = '';
    this.searchString = '';
  }

  blur() {
    this.validResult = [];
    if (this.offautoclear && !this.selected) {
      this.label = '';
      this.onSelect.emit(null);
      this.searchString = this.searchString ? this.searchString : '';
    } else {
      this.searchString = '';
    }
    this.selected = false;
  }

  focusInput() {
    this._inputElement.nativeElement.focus();
  }

  focus() {
    this.searchString = this.searchString ? this.searchString : '';
    this.validResult = this.searchStringInArray(this.searchString, this.searchdata);
  }

  _handleChange(event: Event) {
    console.log((<HTMLInputElement>event.target).value);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    this._value = value;
    this.updateLabel(value);
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

  private searchStringInArray (str: any, strArray: any) {
    let stringList: Array<string> = [];
    strArray = strArray ? strArray : [];
    for (let j = 0; j < strArray.length; j++) {
      if (strArray[j].label) {
        if (strArray[j].label.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
          stringList.push(strArray[j]);
        }
      } else {
        console.error(strArray[j], 'No label found');
        break;
      }
    }
    return stringList;
  }
}
