import { NgModule }                 from '@angular/core';

import { LoginRouting }      from './login.routing';
import { LoginComponent }    from './login.component';
import { SharedModule }           from './../../shared/shared.module';


@NgModule({
  imports: [
    LoginRouting,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}