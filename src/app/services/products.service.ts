import { Injectable } from '@angular/core';
import { NewProduct } from '../models/newProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url="https://localhost:44324/api/products";
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  addProduct(product:NewProduct): Observable<NewProduct> {
    return this.httpClient.post<NewProduct>(`${this.url}`, product, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
  getProductByID(id:string):Observable<Item>{
    return this.httpClient.get<Item>("https://localhost:44324/api/products/"+ id);
  }

  deleteProduct(id:number):Observable<{}>{
    return this.httpClient.delete<{}>(`${this.url}/${id}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
