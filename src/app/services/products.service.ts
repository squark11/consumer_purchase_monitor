import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { ProductItem, ProductResponse } from '../models/product-models';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url="https://localhost:44324/api/products";
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getProducts(filters) {
    return this.httpClient.get<ProductResponse>("https://localhost:44324/api/products", {
      params: filters
    });
  }

  addProduct(product:ProductItem): Observable<ProductItem> {
    return this.httpClient.post<ProductItem>(`${this.url}`, product, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
  getProductByID(id:string):Observable<ProductItem>{
    return this.httpClient.get<ProductItem>("https://localhost:44324/api/products/"+ id);
  }

  deleteProduct(id:number):Observable<{}>{
    return this.httpClient.delete<{}>(`${this.url}/${id}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
  
  updateProduct(id: number, product: ProductItem): Observable<ProductItem> {
    return this.httpClient.put<ProductItem>(`${this.url}/${id}`, product, {
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
