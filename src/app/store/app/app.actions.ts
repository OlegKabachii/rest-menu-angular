import {createAction, props} from "@ngrx/store";
import {Category, Dish, Info} from "../../shared/interfaces";



export const loadCategory = createAction('[App] Load Category')
export const categoryLoaded = createAction('[App] Category Loaded', props<{ categories: Category[] }>())

export const loadDishesByCategory = createAction('[App] Load Dishes by Category ID', props<{ category: string }>())
export const dishesLoaded = createAction('[App] Dishes Loaded', props<{ dishes: Dish[] }>())

export const loadInfo = createAction('[App] Load Info')
export const infoLoaded = createAction('[App] Info loaded', props<{info: Info[]}>())


export const uploadCategory = createAction('[App] Upload Category', props<{ category: Category}>())
export const categoryUploaded = createAction('[App] Category uploaded', props<{ category: Category}>())

export const uploadDish = createAction('[App] Upload Dish', props<{ dish: Dish}>())
export const dishUploaded = createAction('[App] Dish uploaded', props<{ dish: Dish}>())

export const updateDishByID = createAction('[App] Upload Dish by ID', props<{ id: string, dish: Dish}>())
export const dishByIdUpdated = createAction('[App] Dish by ID Uploaded', props<{ id: string, dish: Dish}>())

export const removeCategoryByID = createAction('[App] Remove Category by ID', props<{ id: string}>())
export const categoryByIdRemoved = createAction('[App] Category by ID Removed', props<{ id: string}>())

export const removeDishByID = createAction('[App] Remove Dish by ID', props<{ id: string}>())
export const dishByIdRemoved = createAction('[App] Dish by ID Removed', props<{ id: string}>())

export const updateInfo = createAction('[App] Update Info', props<{ isExist: boolean, info: Info}>())
export const infoUpdated = createAction('[App] Info Updated', props<{ isExist: boolean, info: Info}>())
