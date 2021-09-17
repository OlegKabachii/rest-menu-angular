import {ClientStore} from "./client.models";
import {createSelector} from "@ngrx/store";
import {AppState} from "../../app.module";

export const client = (state: AppState) => state.client

export const categories = createSelector(client, (state: ClientStore) => state.categories)
export const selectDishes = createSelector(client, (state: ClientStore) => state.dishes)

export const info = createSelector(client, (state: ClientStore) => state.info)

 export const categoryName = createSelector(client, (state:ClientStore)=> {
   let catId = state.dishes[0] && state.dishes[0].categoryId
   const category = state.categories.find(el => catId === el.id)
   return catId && category ? category.categoryName : state.categories[0] && state.categories[0].categoryName
 })






