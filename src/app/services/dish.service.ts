import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Dish} from "../shared/interfaces";

@Injectable({providedIn: 'root'})
export class DishService {

  apiUrl: string = 'http://localhost:5000/dish'

  constructor(private httpClient: HttpClient) {
  }

  createDish(body: Dish) {
    return this.httpClient.post(this.apiUrl, body)
  }

  getDishes(categoryId: string) {
    return this.httpClient.get(`${this.apiUrl}/${categoryId}`)

  }

  getDishById(id: string) {
    return this.httpClient.get(`${this.apiUrl}/${id}`)
  }

  updateDish(id: string, body: Dish) {
    return this.httpClient.patch(`${this.apiUrl}/${id}`, body)
  }

  removeDish(id: string) {
   return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }

  sendImage(img: any) {
    const fd: FormData = new FormData()
    fd.append('file', img, img.name)
    return this.httpClient.post(`${this.apiUrl}/upload`, fd)
  }

}
