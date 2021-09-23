import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {removeDishByID, updateDishByID, uploadDish} from "../../../store/app/app.actions";
import {Dish} from "../../../shared/interfaces";
import {Store} from "@ngrx/store";
import {DishService} from "../../../services/dish.service";

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
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
    dishName: new FormControl('', Validators.required),
    dishWeight: new FormControl('', Validators.required),
    dishPrice: new FormControl('', Validators.required),
    dishDescription: new FormControl(''),
    image: new FormControl(''),
    dishAvailable: new FormControl(true)
  })


  constructor(
    private store: Store<any>,
    private dishService: DishService
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
  }

  remove() {
    this.store.dispatch(removeDishByID({id: this.dishForm.value.id}))
  }
}
