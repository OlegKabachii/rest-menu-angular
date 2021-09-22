import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  categoryByIdRemoved,
  categoryLoaded,
  categoryUploaded, dishByIdRemoved,
  dishByIdUpdated,
  dishesLoaded,
  dishUploaded,
  infoLoaded, infoUpdated,
  loadCategory,
  loadDishesByCategory,
  loadInfo, removeCategoryByID, removeDishByID, updateDishByID, updateInfo,
  uploadCategory,
  uploadDish,
} from "./app.actions";
import {map, mergeMap, switchMap} from "rxjs/internal/operators";
import {DishService} from "../../services/dish.service";
import {CategoryService} from "../../services/category.service";
import {InfoService} from "../../services/info.service";

@Injectable()
export class AppEffects {
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
      map((res: any) => dishByIdUpdated({id: res.id ,dish: res}))
    ))
  ))

  updateInfo = createEffect(() => this.actions.pipe(
    ofType(updateInfo),
    switchMap((res) => this.infoService.updateInfo(res.isExist, res.info).pipe(
      map((res: any) => infoUpdated({isExist: res.isExist ,info: res}))
    ))
  ))

  removeCategoryByID = createEffect(() => this.actions.pipe(
    ofType(removeCategoryByID),
    switchMap((res) => this.categoryService.removeCategory(res.id).pipe(
      map((res: any) => categoryByIdRemoved({id: res.id}))
    ))
  ))

  removeDishByID = createEffect(() => this.actions.pipe(
    ofType(removeDishByID),
    switchMap((res) => this.dishService.removeDish(res.id).pipe(
      map(() => dishByIdRemoved({id: res.id}))
    ))
  ))
}

