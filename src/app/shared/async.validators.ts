import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {from, Observable} from "rxjs";
import {map} from "rxjs/internal/operators";
import {Dish} from "./interfaces";



export function existingDishNameValidator(dishesNames: string[], dish: Dish): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return from(dishesNames).pipe(map(() => {
      return dishesNames.includes(control.value.toUpperCase()) && control.value.toUpperCase() !== dish.dishName.toUpperCase() ? {"dishNameExist": true} : null;
    }));
  };
}

export function existingCategoryNameValidator(categoryNames: string[]): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return from(categoryNames).pipe(map(() => {
      return categoryNames.includes(control.value.toUpperCase()) ? {"categoryNameExists": true} : null;
    }));
  };
}
