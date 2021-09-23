import {createSelector} from "@ngrx/store";
import {AppState} from "../../app.module";
import {AppStore, Category, Dish} from "../../shared/interfaces";

export const app = (state: AppState) => state.app

export const categories = createSelector(app, (state: AppStore) => state.categories)

export const clientCategories = createSelector(app, (state: AppStore) => {
  return state.categories.filter((el: Category) => el.categoryAvailable)
})

export const clientDishes = createSelector(app, (state: AppStore) => {
  return state.dishes.filter((el: Dish) => el.dishAvailable)
})

export const selectDishes = createSelector(app, (state: AppStore) => state.dishes)

export const info = createSelector(app, (state: AppStore) => state.info)

export const category = createSelector(app, (state: AppStore) => {
  return state.selectedCategoryId ? state.categories.find(el => el.id === state.selectedCategoryId) : state.categories[0]
})





