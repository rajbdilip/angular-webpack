import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionComponent }    from './introduction.component';
import { CssStyleguideComponent }   from './css-styleguide/css-styleguide.component';
import { CodeStyleguideComponent }  from './code-styleguide/code-styleguide.component';

const routes: Routes = [
  { path: '', redirectTo: '/guidelines/css-styleguide', pathMatch: 'full' },
    { path: 'guidelines', component: IntroductionComponent, children: [
        { path: 'css-styleguide', component: CssStyleguideComponent},
        { path: 'code-styleguide', component: CodeStyleguideComponent }
      ]
    }
];

export const IntroductionRouting: ModuleWithProviders = RouterModule.forChild(routes);