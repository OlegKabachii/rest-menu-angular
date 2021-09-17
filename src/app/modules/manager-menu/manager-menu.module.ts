import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerMenuComponent} from "./manager-menu.component";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    ManagerMenuComponent
  ],
    imports: [
        CommonModule,
        MatCardModule
    ],
  exports:[ManagerMenuComponent]
})
export class ManagerMenuModule { }
