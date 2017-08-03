import { forwardRef, Component, HostBinding, HostListener, Input, ViewChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

const noop = () => {};
export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputsComponent),
  multi: true
};

let nextUniqueId = 0;


/**
 * Component that represents a text input. It encapsulates the <input> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
@Component({
  selector: 'dbs-input',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputsComponent implements ControlValueAccessor, OnInit {

  /**
   * Bindings.
   */
  @Input() align: 'start' | 'end' = 'start';
  @Input() class: string;
  @Input() inputClass: string = '';
  @Input() autocorrect: string;
  @Input() autocapitalize: string;
  @Input() autofocus: boolean = false;
  @Input() disabled: boolean = false;
  @Input() id: string = `md-input-${nextUniqueId++}`;
  @Input() list: string = null;
  @Input() max: string | number = null;
  @Input() maxlength: number = null;
  @Input() min: string | number = null;
  @Input() minlength: number = null;
  @Input() placeholder: string = null;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() spellcheck: boolean = false;
  @Input() step: number = null;
  @Input() tabindex: number = null;
  @Input() type: string = 'text';
  @Input() name: string = null;
  @Input() errorMsg: string = '';
  /**
   * Aria related inputs.
   */
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledBy: string;
  @Input('aria-disabled') ariaDisabled: boolean;
  @Input('aria-required') ariaRequired: boolean;
  @Input('aria-invalid') ariaInvalid: boolean;
  @ViewChild('input') _inputElement: ElementRef;


  private _focused: boolean = false;
  private _value: any = '';
  private _errorMsg: string = '';
  private _requiredErrorMsg: string = 'Required Fields';

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  /** Readonly properties. */
  get focused() { return this._focused; }
  get empty() { return (this._value == null || this._value === '') && this.type !== 'date'; }
  get characterLeftCount(): string {
    let maxChar = this.maxlength ? this.maxlength : 0;
    let currentChar = this._value ? this._value.length : 0;
    return ((maxChar - currentChar)  + ' characters left');
  }
  get inputId(): string { return `${this.id}-input`; }

  // This is to remove the `align` property of the `md-input` itself. Otherwise HTML5
  // might place it as RTL when we don't want to. We still want to use `align` as an
  // Input though, so we use HostBinding.
  @HostBinding('attr.align') get _align(): any { return null; }
  @HostListener('click')
    onClick() {
      this.focus();
    }

  @Output('blur')
  get onBlur(): Observable<FocusEvent> {
    return this._blurEmitter.asObservable();
  }

  @Output('focus')
  get onFocus(): Observable<FocusEvent> {
    return this._focusEmitter.asObservable();
  }

  get value(): any { return this._value; };
  @Input() set value(v: any) {
    v = this._convertValueForInputType(v);
    if (v !== this._value) {
      this._value = v;
      this.value = v;
      this._onChangeCallback(v);
    }
  }

  ngOnInit(): void {
    // required validation
    this._errorMsg = this._requiredErrorMsg;
  }

  addClass(className: string) {
    let classArray = this.inputClass.split(' ');
    let index = classArray.indexOf(className);
    if (index < 1) {
      classArray.push(className);
    }
    this.inputClass = classArray.join(' ');
  }

  removeClass(className: string) {
    let classArray = this.inputClass.split(' ');
    let index = classArray.indexOf(className);
    if (index > -1) {
      classArray.splice(index, 1);
    }
    this.inputClass = classArray.join(' ');
  }

  /** Set focus on input */
  focus() {
    this._inputElement.nativeElement.focus();
  }

  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  _handleBlur(event: FocusEvent) {
    this._validateRequired();
    this._focused = false;
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
  }

  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    if (this.type === 'email') {
      this._validateEmail(this.value);
    }
    this._onTouchedCallback();
  }

  _validateRequired() {
    if (this.required !== false) {
      this.addClass('validate');
    }
  }
  _validateEmail(val: any) {
    if (val.length > 0) {
      this.addClass('validate');
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (pattern.test(val)) {
        this.addClass('success');
        this.removeClass('error');
      } else {
        this.addClass('error');
        this.removeClass('success');
        this._errorMsg = this.errorMsg;
      }
    } else {
        this._reset();
    }
  }

  _reset() {
    this.removeClass('success');
    this.removeClass('error');
    this._errorMsg = this._requiredErrorMsg;
  }

  _keyPress(event: any) {
    const pattern = /[0-9.\+\-\ ]/;
    if (this.type === 'tel') {
      let inputChar = String.fromCharCode(event.charCode);
      // console.log(inputChar, e.charCode);
      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
    }
  }

  _hasPlaceholder(): boolean {
    return !!this.placeholder;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    this._value = value;
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

  /**
   * Convert the value passed in to a value that is expected from the type of the md-input.
   * This is normally performed by the *_VALUE_ACCESSOR in forms, but since the type is bound
   * on our internal input it won't work locally.
   * @private
   */
  private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number': return parseFloat(v);
      default: return v;
    }
  }
}