import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { CommentsResponse} from '../models/commentsResponse'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url = "https://localhost:44324/api/products/"
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  getComments(productID:number): Observable<CommentsResponse[]>{
    return this.httpClient.get<CommentsResponse[]>(this.url+ productID + "/comments")
  }
}

