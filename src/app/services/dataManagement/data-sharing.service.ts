import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Complete_Team360 } from 'src/app/models/db-user';


@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  // initTeams: Team360 = {} as Team360;
  // private generatedTeams = new BehaviorSubject<Team360>(this.initTeams)
  // currentTeams = this.generatedTeams.asObservable();

  // initDataTeams: Array<DbUserTeam360> = []
  // private databaseUserTeams = new BehaviorSubject<Array<DbUserTeam360>>(this.initDataTeams)
  // currentUserTeams = this.databaseUserTeams.asObservable()

  private currentUpdateStatus = new BehaviorSubject<number>(0)
  currentUpdate = this.currentUpdateStatus.asObservable()

  private hr_currentSelectedTeam = new BehaviorSubject<Array<Complete_Team360>>([])
  currentTeam = this.hr_currentSelectedTeam.asObservable()

  constructor() { }

  changeUpdateStatus(message: number){
    this.currentUpdateStatus.next(message)
  }

  changeCurrentTeam(message: Array<Complete_Team360>){
      this.hr_currentSelectedTeam.next(message)
  }


  // changeLocalTeam(message: Team360){
  //   this.generatedTeams.next(message)
  // }

  // changeUserTeam(message: Array<DbUserTeam360>){
  //   this.databaseUserTeams.next(message)
  // }

  
  // loadUserDataTest(){
  //   this.db.testGetData(1).subscribe(resp =>{
  //     this.changeUserTeam(resp)
  //   })
  // }

  // loadTemporalData(): Array<DbUserTeam360>{
  //   var user1: DbUserTeam360 = {
  //     ID: 0,
  //     Partner: 'Christian',
  //     Check1: true,
  //     Check2: false,
  //     Horas: 30,
  //     TipoEval: 0
  //   }

  //   var user2: DbUserTeam360 = {
  //     ID: 0,
  //     Partner: 'Pedro',
  //     Check1: true,
  //     Check2: false,
  //     Horas: 30,
  //     TipoEval: 1
  //   }

  //   var user3: DbUserTeam360 = {
  //     ID: 0,
  //     Partner: 'Jorge',
  //     Check1: true,
  //     Check2: false,
  //     Horas: 30,
  //     TipoEval: 2
  //   }

  //   var user4: DbUserTeam360 = {
  //     ID: 0,
  //     Partner: 'Silver',
  //     Check1: true,
  //     Check2: false,
  //     Horas: 30,
  //     TipoEval: 0
  //   }


  //   var newDisplay: Array<DbUserTeam360> = [user1, user2, user3, user4]
  //   return newDisplay
  // }
}
