import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerMenuComponent} from "./manager-menu.component";
import {DishItemComponent} from './dish-item/dish-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material.module";
import { DishNewComponent } from './dish-new/dish-new.component';
import { CategoryNewComponent } from './category-new/category-new.component';

@NgModule({
  declarations: [
    ManagerMenuComponent,
    DishItemComponent,
    DishNewComponent,
    CategoryNewComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

  ],
  exports: [ManagerMenuComponent]
})
export class ManagerMenuModule {
}
