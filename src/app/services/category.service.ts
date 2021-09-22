import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs";



@Injectable({providedIn:'root'})
export class CategoryService {

  apiUrl: string = 'http://localhost:5000/category'

  constructor(private httpClient: HttpClient) {
  }


  createCategory(body: Category) {
    return this.httpClient.post(this.apiUrl, body)
  }

  getAllCategories() {
    return this.httpClient.get(this.apiUrl)
  }

  getCategoryById(id: string) {
    return this.httpClient.get(`${this.apiUrl}/${id}`)
  }

  updateCategory(id: string, body: Category){
    return this.httpClient.patch(`${this.apiUrl}/${id}`, body)
  }

  removeCategory(id: string){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }

}
