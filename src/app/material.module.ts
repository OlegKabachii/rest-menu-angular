import {NgModule} from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";

const material = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule
]

@NgModule({
  imports:[material],
  exports:[material]
})
export class MaterialModule{}
