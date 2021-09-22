import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientMenuComponent} from "./client-menu.component";
import {MaterialModule} from "../../shared/material.module";


@NgModule({
  declarations: [
    ClientMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,


  ],
  exports: [ClientMenuComponent]
})
export class ClientMenuModule {
}
