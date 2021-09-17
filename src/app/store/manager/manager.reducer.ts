import {ManagerStore} from "./manager.models";
import {Action, createReducer, on} from "@ngrx/store";
import {categoryLoaded, dishesLoaded, infoLoaded} from "./manager.actions";




export const initialState: ManagerStore = {
  categories: [],
  dishes: [],
  info: []
}

const managerReducer = createReducer(
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

export function reducer(state: ManagerStore, action: Action) {
  return managerReducer(state, action)
}
