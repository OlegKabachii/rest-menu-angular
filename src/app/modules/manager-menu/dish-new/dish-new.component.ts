import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DishService} from "../../../services/dish.service";
import {select, Store} from "@ngrx/store";
import {categories, category, selectDishes, selectedCategory} from "../../../store/app/app.selectors";
import {uploadDish} from "../../../store/app/app.actions";
import {Dish} from "../../../shared/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dish-new',
  templateUrl: './dish-new.component.html',
  styleUrls: ['./dish-new.component.scss']
})
export class DishNewComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef | undefined

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  category = this.store.pipe(select(category))
  selectedCategory = this.store.pipe(select(selectedCategory))
  color: ThemePalette = 'warn';
  checked = true;
  isCategoryAvailable = true
  newDishAvailable: boolean = false
  onAdd = false
  fileToUpload!: File | any
  previewImage: any
  loadImage = true


  newDishForm: FormGroup = new FormGroup({
    dishName: new FormControl('', [Validators.required]),
    dishWeight: new FormControl('', Validators.required),
    dishPrice: new FormControl('', Validators.required),
    dishDescription: new FormControl('', Validators.maxLength(250)),
    image: new FormControl(''),
    dishAvailable: new FormControl(false),
    categoryId: new FormControl('')
  })


  constructor(
    private store: Store<any>,
    private dishService: DishService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  add() {
    this.onAdd = !this.onAdd
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
        this.newDishForm.patchValue({image: res})
        this.loadImage = true
      })
  }

  submit() {
    if (this.newDishForm.valid && this.newDishForm.value.dishName.trim()) {
      this.selectedCategory.subscribe(res => {
        this.newDishForm.patchValue({categoryId: res})
      })
      this.store.dispatch(uploadDish({dish: this.newDishForm.value as Dish}))
      this.onReset()
      this.openSnackBar('Created!')
    }
  }

  onReset() {
    this.previewImage = ''
    this.newDishForm.reset()
    this.onAdd = !this.onAdd
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['snackBar']
    });
  }

}
