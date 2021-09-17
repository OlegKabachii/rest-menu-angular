import {createAction, props} from "@ngrx/store";
import {Category, Dish, Info} from "./manager.models";


export const loadCategory = createAction('[Manager] Load Category')
export const categoryLoaded = createAction('[Manager] Category Loaded', props<{ categories: Category[] }>())

export const loadDishesByCategory = createAction('[Manager] Load Dishes by Category ID', props<{ category: string }>())
export const dishesLoaded = createAction('[Manager] Dishes Loaded', props<{ dishes: Dish[] }>())

export const loadInfo = createAction('[Manager] Load Info')
export const infoLoaded = createAction('[Manager] Info loaded', props<{info: Info[]}>())
