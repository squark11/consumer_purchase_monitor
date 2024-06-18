import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { ReportReviewResponse } from '../models/reports-models';

@Injectable({
  providedIn: 'root'
})
export class ReviewReportsService {

  url = "https://localhost:44324/api/review-reports/";

  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  reportReview(reviewId: number, reason: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}${reviewId}`, { reason: reason },{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  getReviewReports(): Observable<ReportReviewResponse> {
    return this.httpClient.get<ReportReviewResponse>(`${this.url}pending-reports`, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  

  deleteReviewReport(reportId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}${reportId}/remove`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
