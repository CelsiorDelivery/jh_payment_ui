import { Component, OnInit } from '@angular/core';
import { Payprocess, CardDetails, UpiDetails, WalletDetails, NetBankingDetails } from 'src/app/models/payprocessmodel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../service/payment-service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-pmtprocess',
  imports: [CommonModule, FormsModule],
  templateUrl: './pmtprocess.html',
  styleUrl: './pmtprocess.scss'
})
export class Pmtprocess implements OnInit {

  payprocess: Payprocess = new Payprocess();
  cardDetails: CardDetails = new CardDetails();
  upiDetails: UpiDetails = new UpiDetails();
  netBankingDetails: NetBankingDetails = new NetBankingDetails();
  walletDetails: WalletDetails = new WalletDetails();

  paymentMethods: string[] = ['Card', 'UPI', 'NetBanking', 'Wallet'];
  
  constructor(private paymentSvc: PaymentService) {    
  }

  ngOnInit() {
    this.payprocess.paymentMethod = this.paymentMethods[0];
  }

  processPayment() {   
    if (this.payprocess.paymentMethod === 'Card') {
      this.paymentSvc.submitCardPayment(this.payprocess, this.cardDetails);
    } else if (this.payprocess.paymentMethod === 'UPI') {  
      this.paymentSvc.submitUpiPayment(this.payprocess, this.upiDetails);
    } else if (this.payprocess.paymentMethod === 'NetBanking') {    
      this.paymentSvc.submitNetBankPayment(this.payprocess, this.netBankingDetails);
    } else if (this.payprocess.paymentMethod === 'Wallet') {
      this.paymentSvc.submitWalletPayment(this.payprocess, this.walletDetails);
      
    }

  }
}