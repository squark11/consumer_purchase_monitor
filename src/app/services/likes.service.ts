import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  url = "https://localhost:44324/api/comments/";
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  addLikeToComment(commentId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.url}${commentId}/likes`, {}, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
  
  removeLikeFromComment(commentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}${commentId}/likes`, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
