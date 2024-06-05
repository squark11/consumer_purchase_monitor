import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReportsService {

  url = "https://localhost:44324/api/product-reports/";
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getPendingProductReportRequests(): Observable<string> {
    return this.httpClient.get<string>(`${this.url}pending-requests`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  PostProductReport(productId: number, description: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}product/${productId}/deleteRequest`, {
      description: description
    }, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  updateProductReportStatus(requestId: number, newStatus: string): Observable<any> {
    return this.httpClient.put<any>(`${this.url}requests/${requestId}/status`, {
      newStatus: newStatus
    },{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  deleteProductReport(productId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}requests/product/${productId}`);
  }
}
