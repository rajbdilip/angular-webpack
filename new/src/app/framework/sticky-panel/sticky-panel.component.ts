import { Component, Input, Renderer, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'sticky-panel',
  templateUrl: './sticky-panel.component.html',
  styleUrls:  ['./sticky-panel.component.scss']
})
export class StickyPanelComponent {
  @Input() topPosition: number = 0;
  @ViewChild('div') _stickyElement: ElementRef;
  stickyMargin: string = 'auto';
  isSticky: boolean = false;
  constructor(private renderer: Renderer) {
    this.renderer.listenGlobal('window', 'scroll', (evt: any) => {
      this.isSticky = (document.body.scrollTop > this.topPosition) ? true : false;
      this.stickyMargin =  (document.body.scrollTop > this.topPosition) ? (-this._stickyElement.nativeElement.offsetWidth).toString() : 'auto';
    });
  }
}