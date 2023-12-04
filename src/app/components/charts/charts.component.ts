import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'node_modules/chart.js';
import { EmployeeService } from 'src/app/services/employee.service';



Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  constructor(private router: Router, private _empService: EmployeeService) {}
  
  private chart: Chart | null = null;chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  chartColors: string[] = ['#FF5733', '#337DFF', '#FFCD33', '#33FF41', '#B133FF', '#FF3381'];

  ngOnInit(): void {
    this._empService.getEmployeeList().subscribe((result) => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          this.labeldata.push(this.chartdata[i].education);
          this.realdata.push(this.chartdata[i].experience);
        }
        this.RenderChart(this.labeldata,this.realdata,'pie','piechart');
        this.RenderChart(this.labeldata, this.realdata, 'bar', 'barchart');
        
      }
    });
  }

  onChartTypeChange(event: any) {
    const selectedChartType = event.target.value;
    this.RenderChart(this.labeldata, this.realdata, selectedChartType, 'chartCanvas');
  }

  RenderChart(labeldata: any, maindata: any, type: any, id: any) {
    const ctx = document.getElementById(id) as HTMLCanvasElement;

    if (this.chart ) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: maindata,
            backgroundColor: this.chartColors.slice(0, maindata.length),
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
