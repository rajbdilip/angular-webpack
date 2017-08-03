import { Component, OnInit }  from '@angular/core';
import { ColorData }          from './../../../shared/model/colordata.class';
import { ColorService }       from './../../../shared/service/color.service';

@Component({
  styleUrls: ['./helper-class.component.scss'],
  templateUrl: './helper-class.component.html'
})

export class HelperClassComponent implements OnInit {
  private datalist: ColorData;

  constructor(
    private ColorService: ColorService) {
  }

  ngOnInit(): void {
    this.ColorService.getServices()
      .then(any => this.datalist = any);
  }
}