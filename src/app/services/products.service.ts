import { Injectable } from '@angular/core';
import { NewProduct } from '../models/newProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Item } from '../models/item';
import { ItemsResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url="https://localhost:44324/api/products";
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getProducts(filters) {
    return this.httpClient.get<ItemsResponse>("https://localhost:44324/api/products", {
      params: filters
    });
  }

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
  
  updateProductReview(productId: number, reviewId: number, comment: string, rating: number): Observable<any> {
    return this.httpClient.put<any>(`${this.url}${productId}/reviews/${reviewId}`, {
      comment: comment,
      rating: rating
    });
  }
}
