import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccountTrans } from '../model/user-account-trans';
@Injectable({
  providedIn: 'root'
})
export class AccTranService {
  private apiUrl = 'http://localhost:3000/transactionData';
  constructor(private http: HttpClient) { }

  getTransactions(): Observable<UserAccountTrans[]> {
       return  this.http.get<UserAccountTrans[]>(this.apiUrl);
  }
}
