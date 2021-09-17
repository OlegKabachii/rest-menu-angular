import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderPageComponent} from './components/header-page/header-page.component';
import {SideMenuPageComponent} from './components/side-menu-page/side-menu-page.component';
import {FooterPageComponent} from './components/footer-page/footer-page.component';
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import * as fromClient from "./store/client/client.reducer";
import * as fromManager from "./store/manager/manager.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ClientEffects} from "./store/client/client.effects";
import {ClientStore} from "./store/client/client.models";
import {MatIconModule} from "@angular/material/icon";
import {ManagerStore} from "./store/manager/manager.models";
import {ManagerEffects} from "./store/manager/manager.effects";
import {ClientMenuModule} from "./modules/client-menu/client-menu.module";
import {ManagerMenuModule} from "./modules/manager-menu/manager-menu.module";

export interface AppState {
  client: ClientStore
  manager: ManagerStore
}

const reducers: ActionReducerMap<any> = {
  client: fromClient.reducer,
  manager: fromManager.reducer
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    SideMenuPageComponent,
    FooterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ClientEffects, ManagerEffects]),
    MatIconModule,
    ClientMenuModule,
    ManagerMenuModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
