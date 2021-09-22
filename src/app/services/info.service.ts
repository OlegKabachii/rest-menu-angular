import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Info} from "../shared/interfaces";


@Injectable({providedIn:'root'})
export class InfoService {

  apiUrl: string = 'http://localhost:5000/info'

  constructor(private httpClient: HttpClient) {
  }

  getInfo() {
    return this.httpClient.get(this.apiUrl)
  }

  updateInfo(isExist: boolean, info: Info) {
    return this.httpClient.patch(`${this.apiUrl}/1`, info)
  }
}
