import { NgModule }                 from '@angular/core';

import { DashBoardRouting }      from './dashboard.routing';
import { DashBoardComponent }    from './dashboard.component';
import { SharedModule }          from './../../shared/shared.module';


@NgModule({
  imports: [
    DashBoardRouting,
    SharedModule
  ],
  declarations: [
    DashBoardComponent
  ]
})
export class DashBoardModule {}