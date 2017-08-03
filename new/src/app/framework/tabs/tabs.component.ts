import { Component, Output, ContentChildren, QueryList, EventEmitter, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tab } from './tab.component';

@Component({
  selector: 'tabs-component',
  templateUrl: './tabs.component.html',
  styleUrls:  ['./tabs.component.scss']
})
export class Tabs implements AfterContentInit {
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  @Output() onSelect = new EventEmitter<any>();
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);
    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab( selectedTab: Tab ) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    // activate the tab the user has clicked on.
    selectedTab.active = true;
    this.onSelect.emit(selectedTab);
  }
}