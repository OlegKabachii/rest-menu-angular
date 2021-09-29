import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {removeDishByID, updateDishByID} from "../../../store/app/app.actions";
import {Dish} from "../../../shared/interfaces";
import {select, Store} from "@ngrx/store";
import {DishService} from "../../../services/dish.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../../shared/dialog/dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {selectDishes} from "../../../store/app/app.selectors";
import {existingDishNameValidator} from "../../../shared/async.validators";


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
  imageRemoved = false

  allDishesName: string[] = []
  dishesName = this.store.pipe(select(selectDishes)).subscribe(res => this.allDishesName = res.map(el => el.dishName.toUpperCase()))
  dishForm: FormGroup = {} as FormGroup


  constructor(
    private store: Store<any>,
    private dishService: DishService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.dishForm.patchValue(this.dish)
  }

  initForm() {
    this.dishForm = new FormGroup({
      id: new FormControl('', Validators.required),
      dishName: new FormControl('', [Validators.required], [existingDishNameValidator(this.allDishesName, this.dish)]),
      dishWeight: new FormControl('', Validators.required),
      dishPrice: new FormControl('', Validators.required),
      dishDescription: new FormControl('', Validators.maxLength(250)),
      image: new FormControl(''),
      dishAvailable: new FormControl(true)
    })
  }

  triggerClick() {
    this.inputRef?.nativeElement.click()
  }

  async onFileUpload(event: any) {
    this.loadImage = false
    this.imageRemoved = false
    this.fileToUpload = event.files[0]
    await this.dishService.sendImage(this.fileToUpload).subscribe(
      (res) => {
        this.previewImage = res
        this.dishForm.patchValue({image: res})
        this.loadImage = true
      })
  }

  onReset() {
    this.imageRemoved = false
    this.dishForm.reset()
    this.dishForm.patchValue(this.dish)
  }

  submitChange() {
    const dish = {...this.dishForm.value, image: this.imageRemoved ? '' : this.dishForm.value.image} as Dish

    this.store.dispatch(updateDishByID({id: this.dishForm.value.id, dish}))
    this.dishForm.markAsPristine();
    this.openSnackBar('Updated!')
  }

  remove() {
    this.store.dispatch(removeDishByID({id: this.dishForm.value.id}))
    this.openSnackBar('Removed!')
  }

  removeImage() {
    this.imageRemoved = true
    this.dishForm.markAsDirty()
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
