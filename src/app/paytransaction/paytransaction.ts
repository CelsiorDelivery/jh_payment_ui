import { Component } from '@angular/core';
import { UserAccountTrans } from '../model/user-account-trans';
import { ChartDataset, ChartOptions,ChartType } from 'chart.js';
@Component({
  selector: 'app-paytransaction',
  standalone: false,
  templateUrl: './paytransaction.html',
  styleUrl: './paytransaction.css'
})
export class Paytransaction {

  userTrans:UserAccountTrans[] = [];
  constructor() {
    this.userTrans = [];
    this.userTrans.push(new UserAccountTrans(1, 101, new Date('2023-10-01'), 500, 'credit', 'Salary', 1500));
    this.userTrans.push(new UserAccountTrans(1, 102, new Date('2023-10-05'), 100, 'debit', 'Groceries', 1400));
    this.userTrans.push(new UserAccountTrans(1, 103, new Date('2023-10-10'), 200, 'debit', 'Utilities', 1200));
    this.userTrans.push(new UserAccountTrans(1, 104, new Date('2023-10-15'), 300, 'credit', 'Freelance Work', 1500));
    this.userTrans.push(new UserAccountTrans(1, 105, new Date('2023-10-20'), 150, 'debit', 'Dining Out', 1350));

}


}