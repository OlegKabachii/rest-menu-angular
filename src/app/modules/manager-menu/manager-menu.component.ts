import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ThemePalette} from "@angular/material/core";
import {categories, category, selectDishes} from "../../store/app/app.selectors";
import {removeCategoryByID} from "../../store/app/app.actions";

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.css']
})
export class ManagerMenuComponent implements OnInit {

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  category = this.store.pipe(select(category))

  color: ThemePalette = 'warn';
  checked = true;
  isCategoryAvailable = true
  newDishAvailable: boolean = false

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {

  }

  //todo: createCategory
  createCategory() {
    //this.route.navigate()
  }

  removeCategory(id: string) {
      this.store.dispatch(removeCategoryByID({id}))

  }

}
