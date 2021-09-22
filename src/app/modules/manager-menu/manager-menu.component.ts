import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ThemePalette} from "@angular/material/core";
import {categories, category, categoryName, selectDishes} from "../../store/app/app.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.css']
})
export class ManagerMenuComponent implements OnInit {

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  categoryName = this.store.pipe(select(categoryName))
  category = this.store.pipe(select(category))

  color: ThemePalette = 'warn';
  checked = true;
  isCategoryAvailable = true
  newDishAvailable: boolean = false

  constructor(
    private store: Store<any>,
    private route: Router
  ) {
  }

  ngOnInit(): void {

  }

  createCategory() {
    //this.route.navigate()
  }

  removeCategory() {
    this.category.subscribe((res)=>{
      // this.store.dispatch(removeCategoryByID({id: res.id}))
      console.log(res.id)
    })
  }

}
