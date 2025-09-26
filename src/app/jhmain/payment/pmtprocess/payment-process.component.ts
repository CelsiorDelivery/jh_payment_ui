import { Component, OnInit } from '@angular/core';
import { Payprocess, CardDetails, UpiDetails, WalletDetails, NetBankingDetails } from 'src/app/models/payprocessmodel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../service/payment-service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-pmtprocess',
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './payment-process.component.html',
  styleUrl: './payment-process.component.scss'
})
export class Pmtprocess implements OnInit {
  baseUrl: string = "";
  payprocess: Payprocess = new Payprocess();
  cardDetails: CardDetails = new CardDetails();
  upiDetails: UpiDetails = new UpiDetails();
  netBankingDetails: NetBankingDetails = new NetBankingDetails();
  walletDetails: WalletDetails = new WalletDetails();

  paymentMethods: string[] = ['Card', 'UPI', 'NetBanking', 'Wallet'];

  constructor(private http: HttpClient, private paymentSvc: PaymentService, private route: Router, private auth: AuthService) {
    this.baseUrl = environment.apiUrl;
  }

  ngOnInit() {
    this.payprocess.paymentMethod = this.paymentMethods[0];
  }

  processPayment() {
    if (this.payprocess.paymentMethod === 'Card') {
      //this.paymentSvc.submitCardPayment(this.payprocess, this.cardDetails);
      const payData = {
        "userEmail": this.payprocess.userEmail,
        "amount": this.payprocess.amount,
        "paymentMethod": 1,
        "cardDetails": {
          "cardNumber": this.cardDetails.cardNumber,
          "cardHolderName": this.cardDetails.cardHolderName,
          "expiryMonth": this.cardDetails.cardExpMonth,
          "expiryYear": this.cardDetails.cardExpYear,
          "cvv": this.cardDetails.cardCvv
        },
        "upiDetails": {
          "vpa": ""
        },
        "netBankingDetails": {
          "bankName": "",
          "accountNumber": "",
          "ifscCode": ""
        },
        "walletDetails": {
          "walletProvider": "",
          "walletId": ""
        }
      }

      this.http.post(`${this.baseUrl}/payment-service/ProcessPayment/credit`, payData,
        {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe((response: any) => {
          if (response.errorCode) {
            alert(response.errorMessage);
          } else {
            alert('Card deposited successful!.');
            this.auth.setToken(response.responseBody.accessToken);
            this.route.navigate(['/analytics']);
          }
        })
    } else if (this.payprocess.paymentMethod === 'UPI') {
      //this.paymentSvc.submitUpiPayment(this.payprocess, this.upiDetails);
      const payData = {
        "userEmail": this.payprocess.userEmail,
        "amount": this.payprocess.amount,
        "paymentMethod": 2,
        "cardDetails": {
          "cardNumber": "",
          "cardHolderName": "",
          "expiryMonth": "",
          "expiryYear": "",
          "cvv": ""
        },
        "upiDetails": {
          "vpa": this.upiDetails.upiId
        },
        "netBankingDetails": {
          "bankName": "",
          "accountNumber": "",
          "ifscCode": ""
        },
        "walletDetails": {
          "walletProvider": "",
          "walletId": ""
        }
      }

      this.http.post(`${this.baseUrl}/payment-service/ProcessPayment/credit`, payData,
        {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe((response: any) => {
          if (response.errorCode) {
            alert(response.errorMessage);
          } else {
            alert('UPI Payment successful!.');
            this.auth.setToken(response.responseBody.accessToken);
            this.route.navigate(['/analytics']);
          }
        })

    } else if (this.payprocess.paymentMethod === 'NetBanking') {
      //this.paymentSvc.submitNetBankPayment(this.payprocess, this.netBankingDetails);
      const payData = {
        "userEmail": this.payprocess.userEmail,
        "amount": this.payprocess.amount,
        "paymentMethod": 3,
        "cardDetails": {
          "cardNumber": "",
          "cardHolderName": "",
          "expiryMonth": "",
          "expiryYear": "",
          "cvv": ""
        },
        "upiDetails": {
          "vpa": ""
        },
        "netBankingDetails": {
          "bankName": this.netBankingDetails.bankName,
          "accountNumber": this.netBankingDetails.accountNumber,
          "ifscCode": this.netBankingDetails.ifscCode
        },
        "walletDetails": {
          "walletProvider": "",
          "walletId": ""
        }
      }

      this.http.post(`${this.baseUrl}/payment-service/ProcessPayment/credit`, payData,
        {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe((response: any) => {
          if (response.errorCode) {
            alert(response.errorMessage);
          } else {
            alert('Net Payment successful!.');
            this.auth.setToken(response.responseBody.accessToken);
            this.route.navigate(['/analytics']);
          }
        })
    } else if (this.payprocess.paymentMethod === 'Wallet') {
      //this.paymentSvc.submitWalletPayment(this.payprocess, this.walletDetails);
      const payData = {
        "userEmail": this.payprocess.userEmail,
        "amount": this.payprocess.amount,
        "paymentMethod": 4,
        "cardDetails": {
          "cardNumber": "",
          "cardHolderName": "",
          "expiryMonth": "",
          "expiryYear": "",
          "cvv": ""
        },
        "upiDetails": {
          "vpa": ""
        },
        "netBankingDetails": {
          "bankName": "",
          "accountNumber": "",
          "ifscCode": ""
        },
        "walletDetails": {
          "walletProvider": this.walletDetails.walletProvider,
          "walletId": this.walletDetails.walletId
        }
      }

      this.http.post(`${this.baseUrl}/payment-service/ProcessPayment/credit`, payData,
        {
          headers: { 'Content-Type': 'application/json' }
        }).subscribe((response: any) => {
          if (response.errorCode) {
            alert(response.errorMessage);
          } else {
            alert('Wallet Payment successful!.');
            this.auth.setToken(response.responseBody.accessToken);
            this.route.navigate(['/analytics']);
          }
        })
    }
  }
}