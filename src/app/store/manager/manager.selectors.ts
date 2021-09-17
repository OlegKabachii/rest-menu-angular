import {AppState} from "../../app.module";
import {createSelector} from "@ngrx/store";
import {ManagerStore} from "./manager.models";


export const manager = (state: AppState) => state.manager

export const managerCategories = createSelector(manager, (state: ManagerStore) => state.categories)
export const managerSelectDishes = createSelector(manager, (state: ManagerStore) => state.dishes)

export const managerInfo = createSelector(manager, (state: ManagerStore) => state.info)

 export const managerCategoryName = createSelector(manager, (state:ManagerStore)=> {
   let catId = state.dishes[0] && state.dishes[0].categoryId
   const category = state.categories.find(el => catId === el.id)
   return catId && category ? category.categoryName : state.categories[0] && state.categories[0].categoryName
 })






