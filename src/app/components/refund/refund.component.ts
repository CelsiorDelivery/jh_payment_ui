// src/app/components/refund/refund.component.ts
import { Component, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/jhmain/service/auth-service';

@Component({
  selector: 'app-refund',
  standalone: true,
  imports: [SharedModule, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent {
  transactionId = signal('');
  amount = signal(0);
  reason = signal('');

  successMessage = signal('');
  errorMessage = signal('');

  baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {
    this.baseUrl = environment.apiUrl;
  }

  submitRefund() {
    const userId = "1";
    // assuming AuthService stores user info
    const transactionGuid = this.transactionId(); // or use a GUID if required

    //const apiUrl = `${this.baseUrl}/perops/Payment/refund/${userId}/${transactionGuid}`;
    const apiUrl = `${this.baseUrl}/payment-service/Refund/initiate/1/${transactionGuid}`;



    this.http.post(apiUrl, {
  
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      if (response.errorCode) {
        this.errorMessage.set(response.errorMessage);
        this.successMessage.set('');
      } else {
        this.successMessage.set(response.message || 'Refund processed successfully');
        this.errorMessage.set('');
        this.router.navigate(['/analytics']);
      }
    });
  }

}
