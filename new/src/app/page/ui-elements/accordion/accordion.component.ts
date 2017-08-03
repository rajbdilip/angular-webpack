import { Component } from '@angular/core';

@Component({
  styleUrls: ['./accordion.component.scss'],
  templateUrl: './accordion.component.html'
})

export class AccordionComponent {
  public oneAtATime: boolean = true;

  public status: Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  public groups: Array<any> = [
    {
      title: 'Dynamic Header - 1',
      content: 'Dynamic Group Body - 1',
      id: 'radio1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2',
      id: 'radio2'
    },
    {
      title: 'Dynamic Group Header - 3',
      content: 'Dynamic Group Body - 3',
      id: 'radio3'
    }
  ];
}