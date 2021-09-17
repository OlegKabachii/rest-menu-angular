import {Component, OnInit} from '@angular/core';
import {loadCategory, loadDishesByCategory, loadInfo} from "../../store/client/client.actions";
import {select, Store} from "@ngrx/store";
import {categories, info, selectDishes} from "../../store/client/client.selectors";

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})

export class HeaderPageComponent implements OnInit {

  categories = this.store.pipe(select(categories))
  dishes = this.store.pipe(select(selectDishes))
  info = this.store.pipe(select(info))

  constructor(
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategory())
    this.store.dispatch(loadInfo())
  }

  onSelectCategory(id: string) {
    this.store.dispatch(loadDishesByCategory({category: id}))
  }

}
