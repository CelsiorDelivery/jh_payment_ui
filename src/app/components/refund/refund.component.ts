// src/app/components/refund/refund.component.ts
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/jhmain/service/auth-service';

@Component({
  selector: 'app-refund',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule],
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent {
  transactionId = signal('');
  amount = signal(0);
  reason = signal('');
  userDetail: any = {};
  userEmail: string = '';

  successMessage = signal('');
  errorMessage = signal('');

  baseUrl: string = '';

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    // ✅ Load user details from AuthService
    this.userDetail = this.auth.loadUser();
    this.userEmail = this.userDetail?.email || '';
    this.baseUrl = environment.apiUrl;

    // ✅ Pick transactionId from route params if present
    this.route.paramMap.subscribe(params => {
      const txId = params.get('transactionId');
      if (txId) {
        this.transactionId.set(txId); // auto-fill transaction ID
      }
    });
  }

  submitRefund() {
    const transactionGuid = this.transactionId().trim();
    if (!this.userEmail || !transactionGuid) {
      this.errorMessage.set('Email and Transaction ID are required');
      this.successMessage.set('');
      return;
    }

    const apiUrl = `${this.baseUrl}/payment-service/Refund/refund/${this.userEmail}/${transactionGuid}`;

    this.http.get(apiUrl, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);//  next: (response: any) => {
    //    if (response.errorCode) {
    //      this.errorMessage.set(response.errorMessage);
    //      this.successMessage.set('');
    //    } else {
    //      this.successMessage.set(
    //        response.responseBody || response.message || 'Refund processed successfully'
    //      );
    //      this.errorMessage.set('');
    //    }
    //  },
    //  error: () => {
    //    this.errorMessage.set('Something went wrong while processing refund');
    //    this.successMessage.set('');
    //  }
    //});
      }
    });

    
  }
}
