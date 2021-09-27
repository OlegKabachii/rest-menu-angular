import {Action, createReducer, on} from "@ngrx/store";
import {
  categoryByIdUpdated,
  categoryLoaded,
  categoryUploaded,
  dishByIdRemoved,
  dishesLoaded,
  dishUploaded,
  infoLoaded, infoUpdated,
  removeCategoryByID, setActiveCategory, updateDishByID
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
      ...state, categories: params.categories.slice().sort((a,b) => a.categoryName > b.categoryName? 1: -1)
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

  on(categoryByIdUpdated, (state, params) => {
    return {
      ...state, categories: state.categories.map((el) => el.id === params.id ? {...el, ...params.category} : el)
    }
  }),

  on(updateDishByID, (state, params) => {
    return {
      ...state, dish: [params.dish]
    }
  }),

  on(infoUpdated, (state, params) => {
    return {
      ...state, info: [params.info]
    }
  })
)

export function reducer(state: AppStore, action: Action) {
  return appReducer(state, action)
}
