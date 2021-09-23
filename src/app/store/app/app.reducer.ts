import {Action, createReducer, on} from "@ngrx/store";
import {
  categoryLoaded,
  categoryUploaded,
  dishByIdRemoved,
  dishesLoaded,
  dishUploaded,
  infoLoaded, infoUpdated,
  removeCategoryByID, setActiveCategory
} from "./app.actions";
import {AppStore} from "../../shared/interfaces";


export const initialState: AppStore = {
  categories: [],
  dishes: [],
  info: [],
  selectedCategoryId: null
}

const appReducer = createReducer(
  initialState,
  on(dishesLoaded, (state, params) => {
    return {
      ...state, dishes: params.dishes
    }
  }),
  on(setActiveCategory, (state, params) => {
    return {
      ...state, selectedCategoryId: params.id
    }
  }),

  on(categoryLoaded, (state, params) => {
    return {
      ...state, categories: params.categories
    }
  }),
  on(infoLoaded, (state, params) => {
    return {
      ...state, info: params.info
    }
  }),
  on(categoryUploaded, (state, params) => {
    return {
      ...state, categories: [...state.categories, params.category]
    }
  }),
  on(dishUploaded, (state, params) => {
    return {
      ...state, dishes: [...state.dishes, params.dish]
    }
  }),

  on(removeCategoryByID, (state, params) => {
    return {
      ...state, categories: state.categories.filter((el) => el.id !== params.id)
    }
  }),

  on(dishByIdRemoved, (state, params) => {
    return {
      ...state, dishes: state.dishes.filter((el) => el.id !== params.id)
    }
  }),

  on(infoUpdated, (state, params) => {
    return {
      ...state, info: [params.info]
    }
  }),
)

export function reducer(state: AppStore, action: Action) {
  return appReducer(state, action)
}
