import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable({providedIn:'root'})
export class InfoService {

  apiUrl: string = 'http://localhost:5000/info'

  constructor(private httpClient: HttpClient) {
  }

  getInfo() {
    return this.httpClient.get(this.apiUrl)
  }

  updateInfo(id: string, info: string) {
    return this.httpClient.patch(`${this.apiUrl}/${id}`, info)
  }
}
