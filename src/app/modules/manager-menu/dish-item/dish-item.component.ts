import {Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormControl, FormGroup} from "@angular/forms";
import {removeDishByID, updateDishByID, uploadDish} from "../../../store/app/app.actions";
import {Dish} from "../../../shared/interfaces";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {

  @Input() dish: any
  @Input() isCategoryAvailable: boolean = true

  get isDishAvailable() {
    return this.dishForm.value.dishAvailable
  }

  color: ThemePalette = 'warn'
  isReadOnly = false

  dishForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    dishName: new FormControl(''),
    dishWeight: new FormControl(''),
    dishPrice: new FormControl(''),
    dishDescription: new FormControl(''),
    image: new FormControl(''),
    dishAvailable: new FormControl(true)
  })


  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
    this.dishForm.patchValue(this.dish)
  }

  onReset() {
    this.dishForm.reset()
    this.dishForm.patchValue(this.dish)
  }

  submitChange() {
    this.store.dispatch(updateDishByID({id: this.dishForm.value.id, dish: this.dishForm.value as Dish}))
  }

  remove() {
    // console.log(this.dishForm.value.id)
    this.store.dispatch(removeDishByID({id: this.dishForm.value.id}))
  }
}
