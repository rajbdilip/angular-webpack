import { NgModule }                 from '@angular/core';

import { ViewApplicationsRouting }      from './viewapplications.routing';
import { ViewApplicationsComponent }    from './viewapplications.component';
import { SharedModule }          from './../../shared/shared.module';


@NgModule({
  imports: [
    ViewApplicationsRouting,
    SharedModule
  ],
  declarations: [
    ViewApplicationsComponent
  ]
})
export class ViewApplicationsModule {}