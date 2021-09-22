
import {createSelector} from "@ngrx/store";
import {AppState} from "../../app.module";
import {AppStore} from "../../shared/interfaces";

export const client = (state: AppState) => state.client

export const categories = createSelector(client, (state: AppStore) => state.categories)
export const selectDishes = createSelector(client, (state: AppStore) => state.dishes)

export const info = createSelector(client, (state: AppStore) => state.info)

 export const categoryName = createSelector(client, (state:AppStore)=> {
   let catId = state.dishes[0] && state.dishes[0].categoryId
   const category = state.categories.find(el => catId === el.id)
   return catId && category ? category.categoryName : state.categories[0] && state.categories[0].categoryName
 })

export const category = createSelector(client, (state:AppStore)=> {
  let catId = state.dishes[0] && state.dishes[0].categoryId
  const category = state.categories.find(el => catId === el.id)
  return catId && category ? category : state.categories[0] && state.categories[0]
})





