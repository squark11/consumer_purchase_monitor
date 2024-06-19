import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { NewPassword } from '../models/newPassword';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://localhost:44324/api/account';
  
  constructor(private http: HttpClient, private auth:AuthenticationService) { }
  
  register(user: User) {
    return this.http.post(this.url+`/register`, user);
  }
  changePassword(password:NewPassword){
    return this.http.post(this.url+'/change-password', password, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    })
  }
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`https://localhost:44324/api/admin/get-user-by-email/${email}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
