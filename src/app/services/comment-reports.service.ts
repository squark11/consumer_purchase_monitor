import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { CommentReports } from '../models/comment-reports';

@Injectable({
  providedIn: 'root'
})
export class CommentReportsService {

  url = "https://localhost:44324/api/comment-reports/"
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getCommentsReports(filters): Observable<CommentReports[]> {
    return this.httpClient.get<CommentReports[]>(this.url + "pending-reports", {
      params: filters
    });
  }

  postCommentReports(reason, params): Observable<any> {
    return this.httpClient.post<any>(this.url + "report", {
      reason: reason,
      params: params
    });
  }

  putCommentReports(newStatus, id, params): Observable<any> {
    return this.httpClient.put<any>(`${this.url}${id}/status`, {
      params: params
    }, newStatus);
  }

  deleteCommentReport(id): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}${id}`);
  }
}
