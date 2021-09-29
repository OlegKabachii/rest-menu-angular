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

export function existingNameValidator(names: string[]): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return from(names).pipe(map(() => {
      return names.includes(control.value.toUpperCase()) ? {"NameExist": true} : null;
    }));
  };
}
