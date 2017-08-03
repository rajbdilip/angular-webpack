import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, Renderer } from '@angular/core';

// TODO: remove ElementRef
// TODO: add on change
// TODO: #576 add callbacks: expanding, collapsing after adding animation
@Directive({selector: '[collapse]'})
export class CollapseDirective implements OnInit {
  // private animation:any;
  @Output() public collapsed: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() public expanded: EventEmitter<any> = new EventEmitter<any>(false);
  // style
  // @HostBinding('style.height')
  // private height:string;
  // @HostBinding('style.display')
  // public display: string;
  // shown
  @HostBinding('class.in')
  @HostBinding('attr.aria-expanded')
  public isExpanded: boolean = true;
  // hidden
  @HostBinding('attr.aria-hidden')
  public isCollapsed: boolean = false;
  // stale state
  @HostBinding('class.collapse')
  public isCollapse: boolean = true;
  // animation state
  @HostBinding('class.collapsing')
  public isCollapsing: boolean = false;

  // @Input() private transitionDuration:number = 500; // Duration in ms

  @Input()
  public set collapse(value: boolean) {
    this.isExpanded = value;
    this.toggle();
  }

  public get collapse(): boolean {
    return this.isExpanded;
  }

  // private open: boolean;
  // private _ab:AnimationBuilder;
  private _el: ElementRef;
  private _renderer: Renderer;

  public constructor(_el: ElementRef, _renderer: Renderer) {
    // this._ab = _ab;
    this._el = _el;
    this._renderer = _renderer;
  }

  public ngOnInit(): void {
    // this.animation = this._ab.css();
    // this.animation.setDuration(this.transitionDuration);
  }

  public toggle(): void {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  public hide(): void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = false;
    this.isCollapsed = true;

    this.isCollapse = true;
    this.isCollapsing = false;

    // this.display = 'block';
    this.collapsed.emit(this);
  }

  public show(): void {
    this.isCollapse = false;
    this.isCollapsing = true;

    this.isExpanded = true;
    this.isCollapsed = false;

    // this.display = 'block';
    // this.height = 'auto';
    this.isCollapse = true;
    this.isCollapsing = false;
    this.expanded.emit(this);
  }
}