import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {categories, categoryName, selectDishes} from "../../store/app/app.selectors";

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.css']
})
export class ClientMenuComponent implements OnInit {

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  categoryName = this.store.pipe(select(categoryName))



  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {

  }

}
