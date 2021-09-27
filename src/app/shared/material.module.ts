import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";

const material = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  ReactiveFormsModule,
  MatProgressBarModule,
  MatDialogModule
]

@NgModule({
  imports: [material, MatFormFieldModule],
  exports: [material],
  declarations: [
    DialogComponent
  ]
})
export class MaterialModule {
}
