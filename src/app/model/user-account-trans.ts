export class UserAccountTrans {
    userId: number=0;
    transId: number=0;
    transDate: Date=new Date();
    amount: number=0;
    transtype: string=""; // e.g., "credit" or "debit"
    description: string="";
    balAfterTrans: number=0;

    
    constructor(userId: number, transId: number, transDate: Date, amount: number, transtype: string, description: string, balAfterTrans: number) {
        this.userId = userId;
        this.transId = transId;
        this.transDate = transDate;
        this.amount = amount;
        this.transtype = transtype;
        this.description = description;
        this.balAfterTrans = balAfterTrans;
    }
}
