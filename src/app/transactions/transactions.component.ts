import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
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

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // ✅ Hardcoded email for now
    const userEmail = 'jany.doe@example.com';

    this.apiUrl = `${this.baseUrl}/payment-service/ProcessPayment/transaction/${userEmail}`;
    this.getTransactions();
  }

  getTransactions(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.transactions = data;
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
