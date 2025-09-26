export class Payprocess {
    senderEmail:string="";
    userEmail:string="";
    amount:number=0;
    paymentMethod:string="";
}

    export class CardDetails {
        cardNumber:string="";
        cardHolderName:string="";
        cardExpMonth:string="";
        cardExpYear:string="";
        cardCvv:string="";
        amount:number=0;
        userId:string="";
    }

export class UpiDetails {
    upiId:string="";
    amount:number=0;
    userId:string="";
}

export class NetBankingDetails {
    bankName:string="";
    accountNumber:string="";
    ifscCode:string="";

}   
export class WalletDetails {
    walletProvider:string="";
    walletId:string="";
  
}   

