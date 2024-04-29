import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'https://localhost:44324/api/admin';
  
  constructor(private http: HttpClient) { }

  postAdmin(id:number){
    return this.http.post(this.url+`/grant-admin/`+id, id);
  }

  getUserByEmail(email:string){
    return this.http.get(this.url+`get-user-by-email/`+email);
  }
}
