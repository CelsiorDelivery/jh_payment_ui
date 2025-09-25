import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-check-balance',
   imports: [SharedModule,CommonModule, FormsModule],
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.scss']
})
export class CheckBalanceComponent {
  accountNumber: string = '';
  balance: number | null = null;
  loading: boolean = false;
  error: string | null = null;
  baseUrl = "";
  userDetail: any = {};
  userEmail: string = "";
  userId : number;
  fullName: string = "";

  constructor(private auth: AuthService,private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.userDetail = this.auth.loadUser();
    this.userEmail = this.userDetail.email;
    this.userId = this.userDetail.userId;
    this.checkBalance();
  }

  checkBalance(): void {
    this.loading = true;
    this.error = null;
    this.balance = null;

    const url = this.baseUrl + `/payment-service/ProcessPayment/check-balance/${this.userEmail}`;
    this.http.get<{ balance: number }>(url).subscribe({
      next: (response: any) => {
      this.balance = response.responseBody.balance;
      this.fullName = response.responseBody.fullName;
      this.loading = false;
      },
      error: (err) => {
      this.error = 'Failed to fetch balance. Please try again.';
      this.loading = false;
      }
    });
  }
}
