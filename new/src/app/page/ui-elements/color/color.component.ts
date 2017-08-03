import { Component, OnInit }  from '@angular/core';
import { ColorData }          from './../../../shared/model/colordata.class';
import { ColorService }       from './../../../shared/service/color.service';

@Component({
  styleUrls: ['./color.component.scss'],
  templateUrl: './color.component.html'
})
export class ColorComponent implements OnInit {
  private datalist: ColorData;

  constructor(
    private ColorService: ColorService) {
  }

  ngOnInit(): void {
    this.ColorService.getServices()
      .then(any => this.datalist = any);
  }
}