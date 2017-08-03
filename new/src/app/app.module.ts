import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { RouterModule }           from '@angular/router';

// Store.
import { StoreModule }            from '@ngrx/store';
import { StoreDevtoolsModule }    from '@ngrx/store-devtools';
import { reducer }                from './shared/reducers/index';

// app
import { AppComponent }           from './app.component';
import { AppRoutingModule }       from './app-routing.module';
// components
import { IntroductionModule }     from './page/introduction/introduction.module';
import { DbsheaderComponent }     from './component/dbsheader/dbsheader.component';
// services
import { TallyService }           from './shared/service/tally.service';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    IntroductionModule,
    AppRoutingModule,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
      StoreModule.provideStore(reducer),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
      StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  declarations: [
    AppComponent,
    DbsheaderComponent
  ],
  providers: [
    TallyService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}