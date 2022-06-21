import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { DashboardData } from 'src/app/models/db-user';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-hr-doughnut-chart',
  templateUrl: './hr-doughnut-chart.component.html',
  styleUrls: ['./hr-doughnut-chart.component.css']
})
export class HrDoughnutChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart2: BaseChartDirective | undefined;

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
        this.newData.push(resp[0].Orphans)

        var newDataQuery = {
          labels: this.doughnutChartLabels,
          datasets: [
            { data: [ this.newData[0], this.newData[1], this.newData[2] ] }
            // { data: [ 600 ], label: 'Employees With Team'},
            // { data: [ 150 ], label: 'Employees Pending' },
            // { data: [ 50 ], label: 'Unassigned Employees' }
          ]
        };

        this.doughnutChartData = newDataQuery
      }
    })
  }


  // Doughnut
  public doughnutChartLabels: string[] = [ 'Equipos aprobados', 'Equipos pendientes', 'Huérfanos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ this.newData[0], this.newData[1], this.newData[2] ] }
      // { data: [ 600 ], label: 'Employees With Team'},
      // { data: [ 150 ], label: 'Employees Pending' },
      // { data: [ 50 ], label: 'Unassigned Employees' }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
