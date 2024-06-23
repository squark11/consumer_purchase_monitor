import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'https://localhost:44324/api/admin';
  
  constructor(private http: HttpClient, private auth:AuthenticationService) { }

  postAdmin(id: number): Observable<any> {
    return this.http.post(
      `${this.url}/grant-admin/${id}`,{

      }, {
        headers: {
          Authorization: 'Bearer ' + this.auth.currentUserValue.token
        }
      }
    );
  }

  getUserByEmail(email:string):Observable<User>{
    return this.http.get<User>(this.url+`/get-user-by-email/`+email,{
      headers: {
        'Authorization': 'bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
