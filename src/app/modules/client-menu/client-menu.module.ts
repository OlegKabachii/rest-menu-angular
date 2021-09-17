import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientMenuComponent} from "./client-menu.component";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ClientMenuComponent
  ],
    imports: [
        CommonModule,
        MatCardModule
    ],
  exports:[ClientMenuComponent]
})
export class ClientMenuModule { }
