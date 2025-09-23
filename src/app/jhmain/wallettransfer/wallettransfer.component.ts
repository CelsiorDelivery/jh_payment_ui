import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from '../service/auth-service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [SharedModule,RouterModule],
   selector: 'app-wallettransfer',
  templateUrl: './wallettransfer.component.html',
})
export class WalletTransferComponent {
  senderUserId = signal('');
  receiverUserId = signal('');
  amount = signal(0);

  baseUrl: string = "";
  userDetail: any = {};
  userId : number;
  constructor(private route: Router, private http: HttpClient,private auth: AuthService) {
    this.baseUrl = environment.apiUrl;
     this.userDetail = this.auth.loadUser();
     this.userId = this.userDetail.userId;
  }

  submitUser() {
  
     this.http.post(`${this.baseUrl}/payment-service/Payment/wallet/transfer/initiate`, {
      "senderUserId":  this.userId,
      "receiverUserId": this.receiverUserId(),
      "amount": this.amount()
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe((response: any) => {
      if (response.errorCode) { 
        alert(response.errorMessage);
      } else { 
        this.auth.setToken(response.responseBody.accessToken);
        this.route.navigate(['/analytics']);
      }
    })
  }
}