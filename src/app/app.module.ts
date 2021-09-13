import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { SideMenuPageComponent } from './components/side-menu-page/side-menu-page.component';
import { FooterPageComponent } from './components/footer-page/footer-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    SideMenuPageComponent,
    FooterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [
    HeaderPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
