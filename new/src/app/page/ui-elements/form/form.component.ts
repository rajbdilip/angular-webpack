import { Component, OnInit }  from '@angular/core';
import { TallyService }       from './../../../shared/service/tally.service';

@Component({
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
  cities: Array<string>;
  text_value: string = 'initial data';
  email_value: string;
  number_value: string;
  inputValue: string = '';
  selectedItem: any;
  constructor(
    private TallyService: TallyService) {
  }
  _handleFocus(event: FocusEvent) {
    console.log(event);
  }
  ngOnInit(): void {
    const citiesUrl = 'mock/cities.json';
    let _self = this;
    this.TallyService.getServices(citiesUrl).then(function(resp) {
      _self.selectedItem = resp.citiesList[0];
      _self.cities = resp;
    });
  }
}
