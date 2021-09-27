import {AbstractControl} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectDishes} from "../store/app/app.selectors";

export class AsyncValidators {

 static allDishesName: string[] = []
  dishesName = this.store.pipe(select(selectDishes)).subscribe(res => AsyncValidators.allDishesName = res.map(el => el.dishName))

  constructor(
    private store: Store<any>
  ) {
  }

 static uniqDishName(control: AbstractControl): Promise<any> | Observable<any> {

    return new Promise(resolve => {
      if (AsyncValidators.allDishesName.includes(control.value)) {
        resolve({uniqDishName: true})
      } else {
        resolve(null)
      }
    })
  }


}

