import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemsResponse } from '../models/item-response';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  getProducts(filters): Observable<ItemsResponse> {
    return this.httpClient.get<ItemsResponse>("https://localhost:44324/api/products", {
      params: filters
    });
  }
}
