import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DishService} from "../../services/dish.service";
import {CategoryService} from "../../services/category.service";
import {InfoService} from "../../services/info.service";
import {categoryLoaded, loadCategory, loadDishesByCategory} from "./manager.actions";
import {map, mergeMap, switchMap} from "rxjs/internal/operators";
import {dishesLoaded, infoLoaded, loadInfo} from "../client/client.actions";


@Injectable()
export class ManagerEffects {
  constructor(
    private actions: Actions,
    private dishService: DishService,
    private categoryService: CategoryService,
    private infoService: InfoService
    ) {
  }

  loadAllCategory = createEffect(() => this.actions.pipe(
    ofType(loadCategory),
    switchMap((params) => this.categoryService.getAllCategories().pipe(
      mergeMap((res: any) => [categoryLoaded({categories: res}), loadDishesByCategory({category: res[0].id})])
    ))
  ))
  loadDishes = createEffect(() => this.actions.pipe(
    ofType(loadDishesByCategory),
    switchMap((params) => this.dishService.getDishes(params.category).pipe(
      map((res: any) => dishesLoaded({dishes: res}))
    ))
  ))

  loadAllInfo = createEffect(()=> this.actions.pipe(
    ofType(loadInfo),
    switchMap(()=> this.infoService.getInfo().pipe(
      map((res:any) => infoLoaded({info: res}))
    ))
  ))


}

