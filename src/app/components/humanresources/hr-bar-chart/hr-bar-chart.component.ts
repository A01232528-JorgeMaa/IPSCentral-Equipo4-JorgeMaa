import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { DashboardData } from 'src/app/models/db-user';

@Component({
  selector: 'app-hr-bar-chart',
  templateUrl: './hr-bar-chart.component.html',
  styleUrls: ['./hr-bar-chart.component.css']
})
export class HrBarChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  ApprovedTeams: number = 0
  PendingTeams: number = 0
  Orphans: number = 0

  newData: Array<number> = []

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.queryDataBar()
  }

  queryDataBar(){
    this.db.getDashboardData().subscribe(resp =>{
      if(resp.length == 1){

        this.ApprovedTeams = resp[0].ApprovedTeams
        this.PendingTeams = resp[0].PendingTeams
        this.Orphans = resp[0].Orphans

        this.chart?.update()
        
      }
    })
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'center',
        align: 'center'
      }
    }
  };


  public barChartData: ChartData<'bar'> = {
    labels: [ 'Employees' ],
    datasets: [
      { data: [ this.ApprovedTeams ], label: 'Employees With Team' },
      { data: [ this.PendingTeams ], label: 'Employees Pending' },
      { data: [ this.Orphans ], label: 'Unassigned Employees' }
    ]
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

}
