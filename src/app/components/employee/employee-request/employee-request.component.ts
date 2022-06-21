import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/services/dataManagement/data-sharing.service';
import { DbUserTeam360 } from 'src/app/models/db-user';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';
import { Router } from '@angular/router';


type ProfileType = {
  givenName?: string;
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  mail? : string
};

type messages = {
  message: string,
  partner: number,
  evalType: number
}

@Component({
  selector: 'app-employee-request',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.css']
})
export class EmployeeRequestComponent implements OnInit, OnDestroy {

  //EQUIPOS
  profile!: ProfileType;
  displayTeam?: Array<DbUserTeam360>;

  //HTML UI
  allowEditing: boolean = false
  loadingScreen: boolean = true
  subscription?: Subscription



  constructor(
    private router: Router,
    private db: DatabaseService,
    private msSignIn: MsSignInService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    this.loadData(false)
    this.subscription = this.dataSharingService.currentUpdate.subscribe(resp => {
      if(resp != 0){
        console.log("Huehue")
        this.loadData(true)
      }
    })
  }

  loadData(merge: boolean){
    this.msSignIn.getProfile().subscribe(resp => {
      this.profile = resp
      //Si ya confirmo su equipo, no se desplegara la informacion. Esto evitara entrar a la pagina y querer hacer clicks para hacer cambios.
      //La UI no se presentara hasta que sepa el programa si puede editar.
      this.db.getEmployeeEditing(this.profile.mail ?? '').subscribe(resp =>{
        this.allowEditing = resp
        if(!this.allowEditing){
          this.router.navigateByUrl('/home/employee_home')
        }
        else{
          this.db.getEmployeeTeam(this.profile.mail ?? '').subscribe(resp => {
            this.displayTeam = this.mergeTeams(resp, this.displayTeam ?? [], merge)
            this.loadingScreen = false
          })
        }
      })
    })
  }

  mergeTeams(newTeam: Array<DbUserTeam360>, currentTeam: Array<DbUserTeam360>, merge: boolean): Array<DbUserTeam360>{
    console.log("NewTeam")
    console.log(newTeam)
    console.log("CurrentTeam")
    console.log(currentTeam)
    if(newTeam != null){
      for(var i in newTeam){
        if(newTeam[i].Check1 == null){
          newTeam[i].Check1 = true
        }
      }


      if(merge){
        // for(var i in newTeam){
        //   newTeam[i].Check1 = true
        // }
        if(currentTeam != null){
          for(var i in currentTeam){
            if(currentTeam[i].Check1 == null){
              currentTeam[i].Check1 = true
            }
          }
          var localMessages: Array<messages> = []
          for(var i in currentTeam){
            if(currentTeam[i].Check1 == false){
              var newMessage: messages = {
                message: currentTeam[i].Reason ?? '',
                partner: currentTeam[i].PartnerID ?? 0,
                evalType: currentTeam[i].EvalType ?? 0
              }
              localMessages.push(newMessage)
            }
          }

          for(var i in newTeam){
            // if(currentTeam[i].Check1 == false){
            //   newTeam[i].Check1 = false
            // }
            if(localMessages != null){
              for(var j in localMessages){
                if(newTeam[i].PartnerID == localMessages[j].partner && newTeam[i].EvalType == localMessages[j].evalType){
                  newTeam[i].Reason = localMessages[j].message
                  newTeam[i].Check1 = false
                  delete localMessages[j]
                }
              }
            }
          }
          console.log("Hola")
          return newTeam
        }
        else{
          this.router.navigateByUrl('/home/employee_home')
        }
      }
      console.log("Hola2")
      return newTeam
    }
    else{
      this.router.navigateByUrl('/home/employee_home')
    }


    console.log("Hola3")
    return []
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  postEmployeeChanges(){
    this.db.postEmployeeTeam360(this.displayTeam ?? [], 0).subscribe(resp => {
      this.router.navigateByUrl('/home/employee_home')
    })
  }

  




}
