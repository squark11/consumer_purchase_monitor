import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPurchaseService {

  url = "https://localhost:44324/api/UserPurchases/";
  
  constructor(private httpClient: HttpClient, private auth:AuthenticationService) { }

  addPurchase(purchaseName: string, purchaseItems: any[]): Observable<any> {
    return this.httpClient.post<any>(`${this.url}add-purchase`, {
      purchaseName: purchaseName,
      purchaseItems: purchaseItems
    },{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  getUserPurchases(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}user-purchases`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  updateExpenseLimit(newLimit: number): Observable<any> {
    return this.httpClient.post<any>(`${this.url}update-expense-limit`, newLimit,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  removePurchase(purchaseId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}remove-purchase/${purchaseId}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  getPurchaseDetails(purchaseId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}purchase-details/${purchaseId}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
  
  addItemToPurchase(purchaseId: number, item: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}${purchaseId}/items`, item,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }

  removeItemFromPurchase(itemId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}items/${itemId}`,{
      headers: {
        'Authorization': 'Bearer ' + this.auth.currentUserValue.token
      }
    });
  }
}
