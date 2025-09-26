import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../jhmain/service/auth-service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './transactions.component.html',
  styles: [`
    .transactions-container {
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0.5rem 0;
    }
    li {
      padding: 6px;
      border-bottom: 1px solid #ddd;
    }
  `]
})
export class TransactionsComponent implements OnInit {

  transactions: any[] = [];
  loading = true;
  errorMessage = '';
  apiUrl: string = '';
  userDetail: any = {};
  userEmail: string = "";
  

  private baseUrl: string = environment.apiUrl;

  constructor(private route: Router, private auth: AuthService, private http: HttpClient) {
    // ✅ Load user details from AuthService
    this.userDetail = this.auth.loadUser();
    this.userEmail = this.userDetail?.email || '';
  }


  ngOnInit(): void {
    if (this.userEmail) {
      this.apiUrl = `${this.baseUrl}/payment-service/ProcessPayment/transaction/${this.userEmail}`;
      this.getTransactions();
    } else {
      this.errorMessage = 'User email not found';
      this.loading = false;
    }
  }

  getTransactions(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response: any) => {
        this.transactions = (response.responseBody || []).map((tx: any) => {
          const refundDone = tx.transactionStatus?.toLowerCase() === 'refunded';

          return {
            ...tx,
            displayStatus: refundDone ? 'Completed' : 'To Be Initiated'
          };
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load transactions';
        this.loading = false;
        console.error(err);
      }
    });
  }

}
