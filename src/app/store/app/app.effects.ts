import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  categoryByIdRemoved,
  categoryLoaded,
  categoryUploaded,
  dishByIdRemoved,
  dishByIdUpdated,
  dishesLoaded,
  dishUploaded,
  infoLoaded,
  infoUpdated,
  loadCategory,
  loadDishesByCategory,
  loadInfo,
  removeCategoryByID,
  removeDishByID,
  setActiveCategory,
  updateDishByID,
  updateInfo,
  uploadCategory,
  uploadDish,
} from "./app.actions";
import {map, mergeMap, switchMap, withLatestFrom} from "rxjs/internal/operators";
import {DishService} from "../../services/dish.service";
import {CategoryService} from "../../services/category.service";
import {InfoService} from "../../services/info.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.module";
import {Info} from "../../shared/interfaces";

@Injectable()
export class AppEffects {
  constructor(
    private actions: Actions,
    private dishService: DishService,
    private categoryService: CategoryService,
    private infoService: InfoService,
    private store: Store<AppState>
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
      mergeMap((res: any) => [
        setActiveCategory({id: params.category}),
        dishesLoaded({dishes: res})])
    ))
  ))

  loadAllInfo = createEffect(() => this.actions.pipe(
    ofType(loadInfo),
    switchMap(() => this.infoService.getInfo().pipe(
      map((res: any) => infoLoaded({info: res}))
    ))
  ))

  createCategory = createEffect(() => this.actions.pipe(
    ofType(uploadCategory),
    switchMap((res: any) => this.categoryService.createCategory(res.category).pipe(
        map((res: any) => categoryUploaded({category: res}))
      )
    )
  ))

  createDish = createEffect(() => this.actions.pipe(
    ofType(uploadDish),
    switchMap((res: any) => this.dishService.createDish(res.dish).pipe(
        map((res: any) => dishUploaded({dish: res}))
      )
    )
  ))

  updateDishByID = createEffect(() => this.actions.pipe(
    ofType(updateDishByID),
    switchMap((res) => this.dishService.updateDish(res.id, res.dish).pipe(
      map((res: any) => dishByIdUpdated({id: res.id, dish: res}))
    ))
  ))

  updateInfo = createEffect(() => this.actions.pipe(
    ofType(updateInfo),
    switchMap((res) => this.infoService.updateInfo(res.isExist, res.info).pipe(
      map(() => infoUpdated({info: res.info}))
    ))
  ))

  removeCategoryByID = createEffect(() => this.actions.pipe(
    ofType(removeCategoryByID),
    withLatestFrom(this.store),
    switchMap(([res, store]) => this.categoryService.removeCategory(res.id).pipe(
      mergeMap(() => [
        categoryByIdRemoved({id: res.id}),
        loadDishesByCategory({category: store.app.categories[0].id})
      ])
    ))
  ))

  removeDishByID = createEffect(() => this.actions.pipe(
    ofType(removeDishByID),
    switchMap((res) => this.dishService.removeDish(res.id).pipe(
      map(() => dishByIdRemoved({id: res.id}))
    ))
  ))
}

