import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashBoardComponent }   from './dashboard.component';

const routes: Routes = [
    { path: '', component: DashBoardComponent }
];

export const DashBoardRouting: ModuleWithProviders = RouterModule.forChild(routes);