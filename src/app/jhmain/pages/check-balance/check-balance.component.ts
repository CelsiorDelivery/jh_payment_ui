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
  userId : number;

  constructor(private auth: AuthService,private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.userDetail = this.auth.loadUser();
    this.userId = this.userDetail.userId;
    this.balance = this.userDetail.balance;
    this.checkBalance();
  }

  checkBalance(): void {
    this.loading = true;
    this.error = null;
    this.balance = null;

    ///payment-service/ProcessPayment/check-balance/1
    // Replace with your actual API endpoint
    const apiUrl = this.baseUrl +'/payment-service/ProcessPayment/check-balance/{userId}';

    this.http.get<{ balance: number }>(apiUrl).subscribe({
      next: (response) => {
        this.balance = response.balance;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch balance. Please try again.';
        this.loading = false;
      }
    });
  }

//    this.http.post(`${this.baseUrl}/auth-service/Users/update`, {
//       "userId": 10
//     }, {
//       headers: { 'Content-Type': 'application/json' }
//     }).subscribe((response: any) => {
//       if (response.errorCode) {
//         alert(response.errorMessage);
//       } else {

//       }
//     })
//   }
}
