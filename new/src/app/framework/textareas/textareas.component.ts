import { forwardRef, Component, HostBinding, HostListener, Input, ViewChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

const noop = () => {};
export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareasComponent),
  multi: true
};

let nextUniqueId = 0;

/**
 * Component that represents a textbox. It encapsulates the <textbox> HTMLElement and
 * improve on its behaviour, along with styling it according to the Material Design.
 */
@Component({
  selector: 'dbs-textarea',
  templateUrl: './textareas.component.html',
  styleUrls: ['./textareas.component.scss'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TextareasComponent implements ControlValueAccessor, OnInit {

  /**
   * Bindings.
   */
  @Input() align: 'start' | 'end' = 'start';
  @Input() class: string;
  @Input() inputClass: string = '';
  @Input() autofocus: boolean = false;
  @Input() disabled: boolean = false;
  @Input() id: string = `md-textbox-${nextUniqueId++}`;
  @Input() maxlength: number = null;
  @Input() placeholder: string = null;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() tabindex: number = null;
  @Input() cols: number = 20;
  @Input() rows: number = 2;
  @Input() name: string = null;
  @Input() errorMsg: string = '';
  /**
   * Aria related inputs.
   */
  @Input('aria-label') ariaLabel: string;
  @Input('aria-labelledby') ariaLabelledBy: string;
  @Input('aria-disabled') ariaDisabled: boolean;
  @Input('aria-required') ariaRequired: boolean;
  @ViewChild('textarea') _inputElement: ElementRef;

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
  get empty() { return (this._value == null || this._value === ''); }
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
    this._onTouchedCallback();
  }

  _validateRequired() {
    if (this.required !== false) {
      this.addClass('validate');
    }
  }

  _reset() {
    this.removeClass('success');
    this.removeClass('error');
    this._errorMsg = this._requiredErrorMsg;
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
}