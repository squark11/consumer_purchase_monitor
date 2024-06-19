import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { ReportCommentResponse } from '../models/reports-models';

@Injectable({
  providedIn: 'root'
})
export class CommentReportsService {

  url = "https://localhost:44324/api/comment-reports"
  
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getCommentsReports(params): Observable<ReportCommentResponse> {
    return this.httpClient.get<ReportCommentResponse>(this.url + "/pending-reports",{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      },
      params:params
    });
  }

  postCommentReports(productId: number, commentId: number, reason: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/report/${commentId}`, {
      productId: productId,
      reason: reason
    }, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }


  deleteCommentReport(id:number, productId:number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${id}/remove`, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      },
      body: {productId}
    });
  }
}
