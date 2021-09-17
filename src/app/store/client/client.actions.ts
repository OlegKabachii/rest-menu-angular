import {createAction, props} from "@ngrx/store";
import {Category, Dish, Info} from "./client.models";


export const loadCategory = createAction('[Client] Load Category')
export const categoryLoaded = createAction('[Client] Category Loaded', props<{ categories: Category[] }>())

export const loadDishesByCategory = createAction('[Client] Load Dishes by Category ID', props<{ category: string }>())
export const dishesLoaded = createAction('[Client] Dishes Loaded', props<{ dishes: Dish[] }>())

export const loadInfo = createAction('[Client] Load Info')
export const infoLoaded = createAction('[Client] Info loaded', props<{info: Info[]}>())
