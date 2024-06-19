import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportProductResponse } from '../models/reports-models';

@Injectable({
  providedIn: 'root'
})
export class ProductReportsService {

  url = "https://localhost:44324/api/product-reports/";
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getProductReports(params): Observable<ReportProductResponse> {
    return this.httpClient.get<ReportProductResponse>(`${this.url}pending-requests`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      },
      params:params
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



  deleteProductReport(productId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}requests/product/${productId}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
