import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { DashboardData } from 'src/app/models/db-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {

  data?: Array<DashboardData>

  ApprovedTeams: number = 0
  PendingTeams: number = 0
  Orphans: number = 0

  constructor(
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.db.getDashboardData().subscribe(resp =>{
      if(resp.length == 1){
        this.ApprovedTeams = resp[0].ApprovedTeams
        this.PendingTeams = resp[0].PendingTeams
        this.Orphans = resp[0].Orphans
      }
    })
  }

}
