import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/db-user';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';

@Component({
  selector: 'app-employee-notifications',
  templateUrl: './employee-notifications.component.html',
  styleUrls: ['./employee-notifications.component.css']
})
export class EmployeeNotificationsComponent implements OnInit {

  today:Date = new Date();
  Notificationdata?: Array<Day>

  userID: number = 0
  constructor(
    private db: DatabaseService, 
    public dp: DatePipe,
    public signIn: MsSignInService
  ) { }


  ngOnInit(): void {
    this.signIn.getProfile().subscribe(resp => {
      this.db.getUserId(resp.mail ?? '').subscribe(resp => {
        this.userID = resp
        this.getDays()
      })
    })
    

  }

  getDays(){
    this.db.getNotificationsDays(this.userID).subscribe(resp =>{
      this.Notificationdata = resp
      this.getNotifications();
    })
  }

  getNotifications(){
    if(this.Notificationdata != null){
      for(let i in this.Notificationdata){
        // console.log("Fecha query: " + this.Notificationdata[i].date)
        this.db.getNotifications(this.Notificationdata[i].date, this.userID).subscribe(resp=>{
          if(this.Notificationdata != null){
            this.Notificationdata[i].Notifications = resp;
          }
        })
      }
    }
  }

}
