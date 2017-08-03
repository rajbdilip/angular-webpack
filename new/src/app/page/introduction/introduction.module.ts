import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';

import { IntroductionRouting }      from './introduction.routing';
import { IntroductionComponent }    from './introduction.component';
import { CssStyleguideComponent }   from './css-styleguide/css-styleguide.component';
import { CodeStyleguideComponent }  from './code-styleguide/code-styleguide.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IntroductionRouting
  ],
  declarations: [
    IntroductionComponent,
    CssStyleguideComponent,
    CodeStyleguideComponent
  ]
})
export class IntroductionModule {}