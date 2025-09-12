import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTransactions() {
    return this.http.get(`${this.apiUrl}/transactions`);
  }

  makePayment(data: any) {
    return this.http.post(`${this.apiUrl}/payment`, data);
  }
}
