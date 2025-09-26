import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from '../service/auth-service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let bootstrap: any; // To use Bootstrap J

@Component({
  standalone: true,
  imports: [SharedModule, RouterModule],
  selector: 'app-wallettransfer',
  templateUrl: './wallettransfer.component.html',
  styleUrl: './wallettransfer.component.scss'
})
export class WalletTransferComponent {
  senderUserId = signal('');
  receiverUserId = signal('');
  amount = signal(0);
  successMessage = '';
  errorMessage = '';
  baseUrl: string = '';
  userDetail: any = {};
  userId: string;
  form: FormGroup;
 isDisabled = true; // or false
  constructor(
    private route: Router,
    private http: HttpClient,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.baseUrl = environment.apiUrl;
    this.userDetail = this.auth.loadUser();
    this.userId = this.userDetail.email;

    this.form = this.fb.group({
      senderUserId: [this.userId, Validators.required],
      receiverUserId: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  submitUser() {
    this.http
      .post(
        `${this.baseUrl}/payment-service/Payment/wallet/transfer/initiate`,
        {
          senderUserId: this.userId,
          receiverUserId: this.receiverUserId(),
          amount: this.amount()
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .subscribe({
        next: (response: any) => {
          if (response.statusCode === 200) {
            this.successMessage = 'Transaction completed successfully!';
            const modal = new bootstrap.Modal(document.getElementById('successModal'));
            modal.show();
            setTimeout(() => modal.hide(), 5000);
            this.form.reset({ senderUserId: this.userId, receiverUserId: '', amount: '' });
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Form submission failed!';
          const modal = new bootstrap.Modal(document.getElementById('errorModal'));
          modal.show();
          setTimeout(() => modal.hide(), 5000);
        }
      });
  }
}
