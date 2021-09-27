import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerMenuComponent} from "./manager-menu.component";
import {DishItemComponent} from './dish-item/dish-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material.module";
import {DishNewComponent} from './dish-new/dish-new.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = []

@NgModule({
  declarations: [
    ManagerMenuComponent,
    DishItemComponent,
    DishNewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [ManagerMenuComponent]
})
export class ManagerMenuModule {
}
