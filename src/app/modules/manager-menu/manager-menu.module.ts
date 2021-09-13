import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerMenuComponent} from "./manager-menu.component";

@NgModule({
  declarations: [
    ManagerMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ManagerMenuComponent]
})
export class ManagerMenuModule { }
