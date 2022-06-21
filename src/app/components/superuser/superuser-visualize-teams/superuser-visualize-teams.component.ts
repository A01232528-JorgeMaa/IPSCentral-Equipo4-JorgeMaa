import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Complete_Team360, DbUserTeam360, getConflictData, NotificationData, User } from 'src/app/models/db-user';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { HrPopUpConflictComponent } from '../../humanresources/hr-pop-up-conflict/hr-pop-up-conflict.component';

@Component({
  selector: 'app-superuser-visualize-teams',
  templateUrl: './superuser-visualize-teams.component.html',
  styleUrls: ['./superuser-visualize-teams.component.css']
})
export class SuperuserVisualizeTeamsComponent implements OnInit {
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
          break;
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

  filterItems(query: string){
      return this.userList?.filter(function(el) {
          return el.name?.toLocaleLowerCase().indexOf(query.toLowerCase()) !== -1
      })
  }

  getTeam(input: string){
    this.currentUserMail = input
    this.db.getCompleteTeam360(input).subscribe(resp => {
      this.userTeam = resp
    })

  }
}
