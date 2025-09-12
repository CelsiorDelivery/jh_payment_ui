import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartType, registerables } from 'chart.js';
import { UserAccountTrans } from '../model/user-account-trans';
import { AccTranService } from '../services/acc-tran-service';

Chart.register(...registerables);

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.html',
  imports: [CommonModule, FormsModule],
  styleUrl: './user-dashboard.css'
})

export class UserDashboard {
  chart: any;
  selectedChartType: ChartType = 'line';
  chartTypes: ChartType[] = ['line', 'bar', 'pie','doughnut'];
  userAccTransaction: UserAccountTrans[] = [];

  constructor(private accTranService: AccTranService) { }

  ngOnInit(): void {
    this.accTranService.getTransactions().subscribe(data => {
      this.userAccTransaction = data;
      this.createBarChart();
    });
  }

  onChartTypeChange(newType: string) {
    this.selectedChartType = newType as ChartType;
    this.createBarChart();
  }
  
  createBarChart() {
    const labels = this.userAccTransaction.map(t => t.transDate);
    const data = this.userAccTransaction.map(t => t.amount);
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('transactionBarChart', {
      type: this.selectedChartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Transaction Amount',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
