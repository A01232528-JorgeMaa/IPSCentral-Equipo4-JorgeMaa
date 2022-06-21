import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardData } from 'src/app/models/db-user';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';


@Component({
  selector: 'app-hr-pie-chart',
  templateUrl: './hr-pie-chart.component.html',
  styleUrls: ['./hr-pie-chart.component.css']
})
export class HrPieChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  data?: Array<DashboardData>

  newData: Array<number> = []

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.queryData()
      
  }

  queryData(){
    this.db.getDashboardData().subscribe(resp =>{

      if(resp.length == 1){
        this.newData.push(resp[0].ApprovedTeams)
        this.newData.push(resp[0].PendingTeams)
        this.chart?.update()
      }
    })
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        align: 'center',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(1) + "%";
          const display = [`${percentage}`, `${value} Equipos`]
          return display;
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Approved Teams' ], [ 'Pending Teams' ] ],
    datasets: [ {
      data: this.newData
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
