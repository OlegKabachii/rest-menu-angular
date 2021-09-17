import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {managerCategories, managerSelectDishes} from "../../store/manager/manager.selectors";



@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.css']
})
export class ManagerMenuComponent implements OnInit {

  managerCategories = this.store.pipe(select(managerCategories))
  managerSelectDishes = this.store.pipe(select(managerSelectDishes))

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

}
