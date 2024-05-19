import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewsService {

  
  url = "https://localhost:44324/api/products/";

  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getProductReviews(productId: number): Observable<string> {
    return this.httpClient.get<string>(`${this.url}${productId}/reviews`, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  addProductReview(productId: number, comment: string, rating: number): Observable<any> {
    return this.httpClient.post<any>(`${this.url}${productId}/reviews`, {
      comment: comment,
      rating: rating
    }, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  deleteProductReview(productId: number, reviewId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}${productId}/reviews/${reviewId}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  updateProductReview(productId: number, reviewId: number, comment: string, rating: number): Observable<any> {
    return this.httpClient.put<any>(`${this.url}${productId}/reviews/${reviewId}`, {
      comment: comment,
      rating: rating
    },{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
