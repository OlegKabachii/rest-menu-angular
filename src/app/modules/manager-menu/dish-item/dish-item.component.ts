import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {removeDishByID, updateDishByID} from "../../../store/app/app.actions";
import {Dish} from "../../../shared/interfaces";
import {Store} from "@ngrx/store";
import {DishService} from "../../../services/dish.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../shared/dialog/dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AsyncValidators} from "../../../shared/async.validators";

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss']
})
export class DishItemComponent implements OnInit {

  @Input() dish: any
  @Input() isCategoryAvailable: boolean = true
  @ViewChild('input') inputRef: ElementRef | undefined

  get isDishAvailable() {
    return this.dishForm.value.dishAvailable
  }

  color: ThemePalette = 'warn'
  isReadOnly = false
  fileToUpload!: File | any
  previewImage: any
  loadImage = true

  dishForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    dishName: new FormControl('', Validators.required, [AsyncValidators.uniqDishName]),
    dishWeight: new FormControl('', Validators.required),
    dishPrice: new FormControl('', Validators.required),
    dishDescription: new FormControl('', Validators.maxLength(250)),
    image: new FormControl(''),
    dishAvailable: new FormControl(true)
  })


  constructor(
    private store: Store<any>,
    private dishService: DishService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.dishForm.patchValue(this.dish)
  }

  triggerClick() {
    this.inputRef?.nativeElement.click()
  }

  async onFileUpload(event: any) {
    this.loadImage = false
    this.fileToUpload = event.files[0]
    await this.dishService.sendImage(this.fileToUpload).subscribe(
      (res) => {
        this.previewImage = res
        this.dishForm.patchValue({image: res})
        this.loadImage = true
      })
  }

  onReset() {
    this.dishForm.reset()
    this.dishForm.patchValue(this.dish)
  }

  submitChange() {
    this.store.dispatch(updateDishByID({id: this.dishForm.value.id, dish: this.dishForm.value as Dish}))
    this.dishForm.markAsPristine();
    this.openSnackBar('Updated!')
    console.log(this.dishForm)
  }

  remove() {
    this.store.dispatch(removeDishByID({id: this.dishForm.value.id}))
    this.openSnackBar('Removed!')
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.remove()
    });
  }
  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['snackBar']
    });
  }


}
