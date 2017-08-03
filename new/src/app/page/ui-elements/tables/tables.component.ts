import { Component, OnInit }    from '@angular/core';
import { ColorData }            from './../../../shared/model/colordata.class';
import { ColorService }         from './../../../shared/service/color.service';

@Component({
  templateUrl: './tables.component.html'
})

export class TablesComponent implements OnInit {
  private datalist: any;
  private selectedMainColor: ColorData[] = [];
  private selectedSubColor: ColorData[] = [];

  constructor(
    private ColorService: ColorService) {
  }

  ngOnInit(): void {
    this.ColorService.getServices()
      .then(response => this.datalist = response);
  }

  setSelectedMainColor($event: any) {
    this.selectedMainColor = $event;
  }

  setSelectedSubColor($event: any) {
    this.selectedSubColor = $event;
  }

  getColors($event: any) {
    let html = 'Nothing was selected';
    let mainhtml = '';
    let subhtml = '';

    this.selectedMainColor.forEach(
      function(item: ColorData){
        html = '';
        mainhtml += item.colorName + '; ';
      }
    );
    this.selectedSubColor.forEach(
      function(item: ColorData){
        html = '';
        subhtml += item.colorName + '; ';
      }
    );
    alert(html + mainhtml + subhtml);
  }
}