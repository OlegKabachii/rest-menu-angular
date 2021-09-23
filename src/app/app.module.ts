import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderPageComponent} from './components/header-page/header-page.component';
import {FooterPageComponent} from './components/footer-page/footer-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./shared/material.module";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import * as fromApp from "./store/app/app.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AppEffects} from "./store/app/app.effects";
import {ClientMenuModule} from "./modules/client-menu/client-menu.module";
import {ManagerMenuModule} from "./modules/manager-menu/manager-menu.module";
import {AppStore} from "./shared/interfaces";

export interface AppState {
  app: AppStore
}

const reducers: ActionReducerMap<any> = {
  app: fromApp.reducer,
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    FooterPageComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppEffects]),
    ClientMenuModule,
    ManagerMenuModule,
    MaterialModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
