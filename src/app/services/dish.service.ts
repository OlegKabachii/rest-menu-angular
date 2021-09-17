import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class DishService {
  constructor(private httpClient: HttpClient) {
  }


  getDishes(category: string) {
    return this.httpClient.get(`http://localhost:5000/dish/${category}`)

  }


}
