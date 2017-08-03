import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'guidelines', pathMatch: 'full'},
    { path: 'ui-elements', loadChildren: 'app/page/ui-elements/ui-elements.module#UIElementsModule' },
    { path: 'login', loadChildren: 'app/page/login/login.module#LoginModule' },
    { path: 'dashboard', loadChildren: 'app/page/dashboard/dashboard.module#DashBoardModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {}
