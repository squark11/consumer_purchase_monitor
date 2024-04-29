import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { NewPassword } from '../models/newPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://localhost:44324/api/account';
  
  constructor(private http: HttpClient) { }
  
  register(user: User) {
    return this.http.post(this.url+`/register`, user);
  }
  changePassword(password:NewPassword){
    return this.http.post(this.url+'/change-password', password)
  }
}
