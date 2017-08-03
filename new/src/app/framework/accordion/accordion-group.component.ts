import { Component, HostBinding, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AccordionComponent } from './accordion.component';

/* tslint:disable-next-line */
const MouseEvent = (global as any).MouseEvent as MouseEvent;

/* tslint:disable:component-selector-name */
@Component({
  selector: 'accordion-group, accordion-panel',
  styleUrls: ['./accordion-group.component.scss'],
  templateUrl: './accordion-group.component.html'
})
export class AccordionPanelComponent implements OnInit, OnDestroy {
  @Input() public radio_id: string;
  @Input() public heading: string;
  @Input() public panelClass: string;
  @Input() public accordionClass: string;
  @Input() public isDisabled: boolean;
  @Input() public isCollapsible: boolean = true;

  // Questionable, maybe .panel-open should be on child div.panel element?
  @HostBinding('class.panel-open')
  @Input()
  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      this.accordion.closeOtherPanels(this);
    }
  }

  private _isOpen: boolean;
  private _delay: boolean = false;
  private accordion: AccordionComponent;

  public constructor(@Inject(AccordionComponent) accordion: AccordionComponent) {
    this.accordion = accordion;
  }

  public ngOnInit(): any {
    this.panelClass = this.panelClass || 'panel-default';
    this.accordion.addGroup(this);
  }

  public ngOnDestroy(): any {
    this.accordion.removeGroup(this);
  }

  public toggleOpen(event: MouseEvent): any {
    if (!this.isDisabled && !this._delay) {
      this._delay = true;
      let _self = this;
      setTimeout(function(){ _self._delay = false; }, 500);
      if (this.isOpen && !this.isCollapsible) {
        return;
      }
      this.isOpen = !this.isOpen;
    }
  }
}