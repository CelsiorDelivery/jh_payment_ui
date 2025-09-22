import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RefundRequest {
  transactionId: string;
  amount: number;
  reason: string;
}

export interface RefundResponse {
  status: string;
  refundId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  // ✅ use apiBaseUrl from environment
  private apiUrl = `${environment.apiBaseUrl}/refund`;

  constructor(private http: HttpClient) { }

  processRefund(request: RefundRequest): Observable<RefundResponse> {
    return this.http.post<RefundResponse>(this.apiUrl, request);
  }
}
