import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable({providedIn:'root'})
export class CategoryService {

  apiUrl: string = 'http://localhost:5000/category'

  constructor(private httpClient: HttpClient) {
  }


  createCategory(body: any) {
    this.httpClient.post(this.apiUrl, body)
  }

  getAllCategories() {
    return this.httpClient.get(this.apiUrl)
  }

  getCategoryById(id: string) {
    return this.httpClient.get(`${this.apiUrl}/${id}`)
  }
}
