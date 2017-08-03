import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab-component',
  templateUrl: './tab.component.html',
  styleUrls:  ['./tabs.component.scss']
})
export class Tab {
  @Input('tabTitle') title: string;
  @Input() active: boolean = false;
}