import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {categories, category, clientDishes, selectDishes} from "../../store/app/app.selectors";

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss']
})
export class ClientMenuComponent implements OnInit {

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  clientDishes = this.store.pipe(select(clientDishes))
  category = this.store.pipe(select(category))




  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {

  }

}
