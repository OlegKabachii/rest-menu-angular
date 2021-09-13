import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientMenuComponent} from "./client-menu.component";



@NgModule({
  declarations: [
    ClientMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ClientMenuComponent]
})
export class ClientMenuModule { }
