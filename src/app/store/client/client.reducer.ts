import {Action, createReducer, on} from "@ngrx/store";
import {ClientStore} from "./client.models";
import {categoryLoaded, dishesLoaded, infoLoaded} from "./client.actions";

export const initialState: ClientStore = {
  categories: [],
  dishes: [],
  info: []
}

const clientReducer = createReducer(
  initialState,
  on(dishesLoaded, (state, params) => {
    return {
      ...state, dishes: params.dishes
    }
  }),
  on(categoryLoaded, (state, params)=>{
    return {
      ...state, categories: params.categories
    }
  }),
  on(infoLoaded, (state, params) =>{
    return{
      ...state, info: params.info
    }
  })
)

export function reducer(state: ClientStore, action: Action) {
  return clientReducer(state, action)
}
