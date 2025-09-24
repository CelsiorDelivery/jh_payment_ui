import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { Observable } from 'rxjs';
import { CardDetails, Payprocess, UpiDetails, NetBankingDetails, WalletDetails } from 'src/app/models/payprocessmodel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl: string = "";

  constructor(private http: HttpClient, private route: Router, private auth: AuthService) {
    this.baseUrl = environment.apiUrl;
  }

  submitCardPayment(payProcess: Payprocess, cardDetails: CardDetails) {
    const payData = {
      "userId": payProcess.receiverUserId,
      "amount": payProcess.amount,
      "paymentMethod": 1,
      "cardDetails": {
        "cardNumber": cardDetails.cardNumber,
        "cardHolderName": cardDetails.cardHolderName,
        "expiryMonth": cardDetails.cardExpMonth,
        "expiryYear": cardDetails.cardExpYear,
        "cvv": cardDetails.cardCvv
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
          this.auth.setToken(response.responseBody.accessToken);
          this.route.navigate(['/paymentcredit']);
        }
      })

  }

  submitUpiPayment(payProcess: Payprocess, upiPay: UpiDetails) {
    const payData = {
      "userId": payProcess.receiverUserId,
      "amount": payProcess.amount,
      "paymentMethod": 2,
      "cardDetails": {
        "cardNumber": "",
        "cardHolderName": "",
        "expiryMonth": "",
        "expiryYear": "",
        "cvv": ""
      },
      "upiDetails": {
        "vpa": upiPay.upiId
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
          this.auth.setToken(response.responseBody.accessToken);
          this.route.navigate(['/paymentcredit']);
        }
      })
  }

  submitNetBankPayment(payProcess: Payprocess, netBank: NetBankingDetails) {
    const payData = {
      "userId": payProcess.receiverUserId,
      "amount": payProcess.amount,
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
        "bankName": netBank.bankName,
        "accountNumber": netBank.accountNumber,
        "ifscCode": netBank.ifscCode
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
          this.auth.setToken(response.responseBody.accessToken);
          this.route.navigate(['/paymentcredit']);
        }
      })
  }

  submitWalletPayment(payProcess: Payprocess, walletPay: WalletDetails) {
    const payData = {
      "userId": payProcess.receiverUserId,
      "amount": payProcess.amount,
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
        "walletProvider": walletPay.walletProvider,
        "walletId": walletPay.walletId
      }
    }

    this.http.post(`${this.baseUrl}/payment-service/ProcessPayment/credit`, payData,
      {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe((response: any) => {
        if (response.errorCode) {
          alert(response.errorMessage);
        } else {
          this.auth.setToken(response.responseBody.accessToken);
          this.route.navigate(['/paymentcredit']);
        }
      })
  }

}
