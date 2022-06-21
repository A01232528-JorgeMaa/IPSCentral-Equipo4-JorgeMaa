import { HttpClient } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Complete_Team360, NotificationData, getConflictData, User } from 'src/app/models/db-user';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { HrPopUpConflictComponent } from '../hr-pop-up-conflict/hr-pop-up-conflict.component';

@Component({
  selector: 'app-hr-approveteams',
  templateUrl: './hr-approveteams.component.html',
  styleUrls: ['./hr-approveteams.component.css']
})
export class HrApproveteamsComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event){
    event.returnValue = false;
  }

  userList?: Array<User>
  displayUserList?: Array<User> 
  userTeam?: Array<Complete_Team360>
  userTeamNotApproved?: Array<Complete_Team360>
  currentUser: string = ""
  currentUserMail: string = ""

  searchQuery: string = ''

  ownerEditing: boolean = false

  //Display Filters
  alphabeticSort: boolean = false
  approvedSort: boolean = false
  orphanSort: boolean = false





  constructor(
    private db: DatabaseService,
		private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.queryUsers()
  }

  queryUsers() {
    this.db.getUsers().subscribe(resp =>{
      this.userList = resp
      this.displayUserList = resp
      this.alphabeticSort = false
      this.approvedSort = false
    })
  }

  checkConflict(input: Complete_Team360){
      const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = true
      dialogConfig.autoFocus = true

			dialogConfig.data = {
				newUser: input
			}

			const dialogRef = this.dialog.open(HrPopUpConflictComponent, dialogConfig)
			dialogRef.afterClosed().subscribe(data => {
        input.Notification = data
			})

  }

  sortUserList(input: number, query: string){
    if(this.userList != null){
      switch (input){
        case 1:
          this.displayUserList = this.filterItems(query)
          break
        case 2:
          this.displayUserList?.sort((a, b) => (b.name ?? '').localeCompare((a.name ?? '')))
          this.alphabeticSort = !this.alphabeticSort
          break
        case 3:
          this.displayUserList?.sort((a, b) => (a.name ?? '').localeCompare((b.name ?? '')))
          this.alphabeticSort = !this.alphabeticSort
          break
        case 4:
          this.approvedSort = !this.approvedSort
          this.displayUserList = this.filterApproved(this.approvedSort)
          break
        case 5:
          this.orphanSort = !this.orphanSort
          this.displayUserList = this.filterOrphans(this.orphanSort)
          break;
          
      }
    }
  }

  filterOrphans(input: boolean){
    var newDisplay: Array<User> = []
    if(this.userList != null){
      for(var i in this.userList){
        if(input){
          if(this.userList[i].Status == 0){
            newDisplay.push(this.userList[i])
          }
        }
        else{
          if(this.userList[i].Status != 0){
            newDisplay.push(this.userList[i])
          }
        }
        
      }
    }
    return newDisplay
  }

  filterApproved(input: boolean){
    var newDisplay: Array<User> = []
    if(this.userList != null){
      for(var i in this.userList){
        if(input){
          if(this.userList[i].Status != 2){
            newDisplay.push(this.userList[i])
          }
        }
        else{
          if(this.userList[i].Status == 2){
            newDisplay.push(this.userList[i])
          }
        }
        
      }
    }
    return newDisplay
  }

  filterItems(query: string){
      return this.userList?.filter(function(el) {
          return el.name?.toLocaleLowerCase().indexOf(query.toLowerCase()) !== -1
      })
  }

  getTeam(input: string){

    this.currentUserMail = input
    this.db.getEmployeeEditing(input).subscribe(resp => {
      this.ownerEditing = resp
      this.db.getCompleteTeam360(input).subscribe(resp => {
        this.processTeam(resp, this.ownerEditing)
      })
    })
  }

  processTeam(input: Array<Complete_Team360>, allowEditing: boolean){
    //Warning Levels:
    //0 -> Approved already
    //1 -> Not confirmed one or the other or both
    //2 -> Conflicts
    //3 -> Exceptions

    for(var i in input){
      input[i].Notification = []
      switch (input[i].EvalType){
        case 2:
          input[i].EvalTypePartner = 1
          break
        case 1:
          input[i].EvalTypePartner = 2
          break
        default:
          input[i].EvalTypePartner = 0
          break
      }

      input[i].HrDecision = true
      this.notificationModule(input[i], 0, false)
      if(allowEditing){
        input[i].warning = 0
        if(input[i].OwnerCheck == null || input[i].PartnerCheck == null){
          input[i].warning = 1
        }

        if(input[i].PartnerCheck == false || (input[i].Approved == null && input[i].OwnerCheck ==false)){
          input[i].warning = 2
          if(input[i].Approved == false){
            input[i].Approved = true
            input[i].HrDecision = false
          }
        }

        if((input[i].Approved == false || input[i].Hours < 40) && input[i].warning != 2){
          input[i].warning = 3
          input[i].HrDecision = input[i].Approved
        }
        
        if(input[i].OwnerCheck == null){
          input[i].OwnerCheck = true
        }
      }
      else{
        input[i].warning = 0

        if(input[i].PartnerCheck == null){
          input[i].warning = 1
        }

        if(input[i].PartnerCheck == false || input[i].OwnerCheck == false){
          input[i].warning = 2
          if(input[i].Approved == false){
            input[i].Approved = true
            input[i].HrDecision = false
          }
        }

        if((input[i].Approved == false || input[i].Hours < 40) && input[i].warning != 2){
          input[i].warning = 3
          input[i].HrDecision = input[i].Approved
        }
      }
    }
    this.userTeam = input
  }

  notificationModule(input: Complete_Team360, notificationAction: number, flipSwitch: boolean){
    //Notification Action
    // 0-> Query conflict data and replace
    // 1-> Delete user from conflict and push
    // 2-> Add Notificacion due to adding user

    if(notificationAction == 0){
      this.queryNotification(input);
    }

    if(flipSwitch){
      input.HrDecision = !input.HrDecision
      if(input.warning == 1 || input.warning == 0){
        this.notificationRemove(input);
      }

      if(input.warning == 2){
        this.notificationConflict(input);
        
      }

      if(input.warning == 3){
        this.notificationAdd(input);
        if(input.Approved == false){
          input.Approved = true
          input.HrDecision = true
        }
        else{
          input.Approved = false
          input.HrDecision = false
        }
      }
      

    }

    
  }

  insertNewNotification(type: number, input: Complete_Team360, owner: boolean): NotificationData {
    //Owner = True -> The sender is the owner of the input
    //Owner = false -> The sender is the partner of the input
    if(owner){
      var notificationOwner: NotificationData = {
        OwnerName: input.TeamOwner ?? '',
        OwnerID: input.TeamOwnerID ?? 0,
        PartnerID: input.PartnerID ?? 0,
        EvalType: input.EvalType ?? 0,
        Reason: '',
        HrResponse: '',
        RequestType: type,
        Status: false
      }
      return notificationOwner;
    }
    else{
      var notificationPartner: NotificationData = {
        OwnerName: input.Partner ?? '',
        OwnerID: input.PartnerID ?? 0,
        PartnerID: input.TeamOwnerID ?? 0,
        EvalType: input.EvalTypePartner ?? 0,
        Reason: '',
        HrResponse: '',
        RequestType: type,
        Status: false
      }
      return notificationPartner;
    }
    
  }

  queryNotification(input: Complete_Team360){
    var conflictQuery: getConflictData ={
      owner: input.TeamOwnerID ?? 0,
      partner: input.PartnerID ?? 0,
      evalTypeOwner: input.EvalType ?? 0,
      evalTypePartner: input.EvalTypePartner ?? 0,
      RequestType: 0
    }

    input.Notification = []
    this.db.getConflictData(conflictQuery).subscribe(resp => {
      input.Notification = resp
      if(resp.length != 0 && input.Hours > 40 && resp[0].RequestType  == 0 && input.Approved == false){
        input.warning = 1
        input.Approved = true
        input.HrDecision = false
      }
      for(var i in input.Notification){
        input.conflictStatus = input.Notification[i].Status
      }
    })
  }

  notificationConflict(input: Complete_Team360){
    // console.log(input);
    if(input.Notification?.length == 1){
      if(input.HrDecision == false){
        // console.log("Insertar")
        input.Notification.push(this.insertNewNotification(0, input, input.OwnerCheck ?? true));
      }
    }
    else if(input.Notification?.length == 2){
      if(!input.Notification[0].Status){
        this.queryNotification(input);
      }
    }
  }

  notificationAdd(input: Complete_Team360){
    if(input.HrDecision == true){
      if(input.Notification?.length == 0){
        input.Notification.push(this.insertNewNotification(1, input, true));
        input.Notification.push(this.insertNewNotification(1, input, false));
      }
    }
    else{
      if(input.Notification?.length == 1 || input.Notification?.length == 2){
        if(!input.Notification[0].Status){
          input.Notification = []
        }
      }
    }
  }

  notificationRemove(input: Complete_Team360){
    if(input.Notification?.length == 0){
      if(input.HrDecision == false){
        input.Notification.push(this.insertNewNotification(0, input, true));
        input.Notification.push(this.insertNewNotification(0, input, false));
      }
    }
    if(input.Notification?.length == 2){
      if(!input.Notification[0].Status){
        if(input.HrDecision == true){
          input.Notification = []
        }
      }
      
    }
  }
  checkMessage(input: Array<NotificationData>): boolean{
    var output = false
    if(input.length > 0){
      for(var i in input){
        if((input[i].HrResponse?.length ?? 0) > 0){
          output = true
        }
      }
    }
    return output
  }

  confirmTeam(){
    console.log(this.userTeam)
    this.db.hr_ConfirmTeam(this.userTeam ?? []).subscribe(resp => {
      this.getTeam(this.currentUserMail)
      this.queryUsers()
    })
  } 

  clockIconStatus(input: Array<NotificationData>): boolean{
    if(input.length > 0){
      if(input[0].Status){
        return true
      }
    }
    return false
  }
}
