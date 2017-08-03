import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewApplicationsComponent }   from './viewapplications.component';

const routes: Routes = [
    { path: '', component: ViewApplicationsComponent }
];

export const ViewApplicationsRouting: ModuleWithProviders = RouterModule.forChild(routes);