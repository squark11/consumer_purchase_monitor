import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Comment, PaginatedComments } from '../models/comments.models';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url = "https://localhost:44324/api/products/"
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getComments(productId: number): Observable<PaginatedComments> {
    return this.httpClient.get<PaginatedComments>(`${this.url}${productId}/comments`, {
      headers:{
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }


  postComment(productId: number, content: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}${productId}/comments`, {
      content: content
    }, {
      headers:{
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  postCommentReply(productId: number, commentId: number, content: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}${productId}/comments/${commentId}/reply`, {
      content: content
    }, {
      headers:{
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  updateComment(productId: number, commentId: number, content: string): Observable<any> {
    return this.httpClient.put<any>(`${this.url}${productId}/comments/${commentId}`, {
      content: content
    }, {
      headers:{
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  deleteComment(productId: number, commentId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}${productId}/comments/${commentId}`, {
      headers:{
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

   getCommentReplies(productId: number, commentId: number): Observable<PaginatedComments> {
    return this.httpClient.get<PaginatedComments>(`${this.url}${productId}/comments/${commentId}/replies`, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}

