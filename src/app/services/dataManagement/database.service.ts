import { HttpClient } from '@angular/common/http';
import { HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbUserTeam360, UserType, User, ManageUsers, Complete_Team360, getConflictData, NotificationData, addNewUser, DashboardData, Day, Notification } from 'src/app/models/db-user';
import { map } from 'rxjs';
import { response } from 'express';
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http: HttpClient
  ) { }


  //SUPERUSUARIO
  getUserType(email: string) {
    var URL = `http://localhost:4000/api/user_getType/` + email
    return this.http.get<Array<UserType>>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  processFile(file: File) {

    let formData = new FormData()
    formData.append('file', file)
    let params = new HttpParams()
    const options = {
      params: params
    }

    var URL = `http://localhost:4000/api/processFile`
    const req = new HttpRequest('POST', URL, formData, options)
    return this.http.request(req)
  }

  getProccessProgress() {
    var URL = `http://localhost:4000/api/getUploadProgress`
    return this.http.get<number>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  deleteData() {
    var URL = `http://localhost:4000/api/su/deleteDatabase`
    return this.http.delete(URL)
  }

  addUser(input: addNewUser) {
    var URL = `http://localhost:4000/api/su/addUser`
    return this.http.post<any>(URL, input).pipe(map(resp => {
      console.log(resp);
    }))
  }

  updateUserType(users: Array<ManageUsers>) {
    var URL = `http://localhost:4000/api/su/updateUser`;
    return this.http.post<any>(URL, users).pipe(map(resp => {
      console.log(resp);
    }))
  }

  publishData(){
    var URL = `http://localhost:4000/api/releaseData`
    return this.http.get<boolean>(URL)
      .pipe(
        map(
          resp => {
            return resp
          }
        )
      )
  }

  //EMPLEADOS

  getEmployeeEditing(email: string) {
    var URL = `http://localhost:4000/api/getEmployeeEditing/` + email
    return this.http.get<boolean>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  getEmployeeTeam(email: string) {
    var URL = `http://localhost:4000/api/user_getTeam/` + email
    // this.http.get(URL).subscribe(resp =>{
    //   console.log("RAW DATA")
    //   console.log(resp)
    // })

    //Por algun motivo, ni dios sabe como, pero al hacer el fetch de la base de datos
    //se hace el pipe a un array de DbUserTeam360
    //Algunos valores que vienen de la base de datos son nulos tales como
    //'Approved', 'Check1' y 'Reason'
    //Al hacer el pipe(map()) y si los tres son nulos de la base de datos, Angular deberia hacer esto:
    //Resultado esperado:
    //  Approved = null
    //  Check1 = null
    //  Reason = null
    //Pero Angular hace esto:
    //  Approved = null
    //  Check1 = true
    //  Reason = null 
    //PERO algo pasa cuando la variable de 'currentUpdate' ubicada en data-sharing-service es 1 (Cuando la webapp hace un update) y
    //en el componente de employee-request, que hace que todos los valores destinados a Check1 sean FALSE
    //Aunque la base de datos envie un array para check1 como -> [TRUE, NULL, FALSE, TRUE]
    //Angular al hacer el pipe(map) hace esto -> [FALSE, FALSE, FALSE, FALSE]

    //Escribe aqui la cantidad de horas dedicadas a solucionar esto: 3 Horas


    //Update: Al hacer una mexicanada para solucionar el request, de la nada angular hace "medio bien"
    //Es decir, si recibe para Check1 -> [TRUE, NULL, FALSE]
    //Angular pone en el Check1 -> [TRUE, TRUE, FALSE]
    //Deje la mexicanda comentada por ahora

    //RESUELTO! YAY!
    this.http.get(URL).subscribe(resp => {
      console.log("RAW DATA")
      console.log(resp)
    })

    return this.http.get<Array<DbUserTeam360>>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  postEmployeeTeam360(input: Array<DbUserTeam360>, publish: number) {
    var URL = `http://localhost:4000/api/postEmployeeTeam360/` + publish
    return this.http.post<any>(URL, input).pipe(
      map(resp => {
        return resp
      })
    )
  }

  //RECURSOS HUMANOS
  getUsersSu() {
    var URL = `http://localhost:4000/api/user_getUsers`
    return this.http.get<Array<ManageUsers>>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  getUsers() {
    var URL = `http://localhost:4000/api/hr/getUsers`
    return this.http.get<Array<User>>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  getCompleteTeam360(email: string) {
    var URL = `http://localhost:4000/api/hr/getCompleteTeam/` + email

    return this.http.get<Array<Complete_Team360>>(URL, {responseType: 'json'})
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  getConflictData(input: getConflictData){
      var URL = `http://localhost:4000/api/hr/getConflictData`
      return this.http.post<Array<NotificationData>>(URL, input)
			.pipe(
				map(resp =>{
						return resp
				})
			)
  }

  hr_ConfirmTeam(input: Array<Complete_Team360>){
    var URL = `http://localhost:4000/api/hr/confirmTeam`
    return this.http.post<any>(URL, input).pipe(
      map(resp => {
        return resp
      })
    )
  }
    
  
  getNotificationsDays(user: number){
    var URL = `http://localhost:4000/api/hr/getNotificationsDays/` + user;
    return this.http.get<Array<Day>>(URL)
    .pipe(
      map(resp =>{
        return resp;
      })
    )
  }

  getNotifications(day:Date, user: number){
    var URL = `http://localhost:4000/api/hr/getNotifications/`+ day + `/` + user;
    return this.http.get<Array<Notification>>(URL)
    .pipe(
      map(resp =>{
        return resp;
      })
    )
  }

  //GENERAL
  getEmployeeUpdate(email: string) {
    var URL = `http://localhost:4000/api/getAppUpdate/` + email
    return this.http.get<number>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  getReceivedUpdate(email: string) {
    var URL = `http://localhost:4000/api/getAppReceivedUpdate/` + email
    return this.http.get<number>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  getReleasedStatus() {
    var URL = `http://localhost:4000/api/getReleasedStatus`
    return this.http.get<number>(URL)
      .pipe(
        map(resp => {
          return resp
        })
      )
  }

  getDashboardData(){
    var URL = `http://localhost:4000/api/general/dashboardStatistic`
    return this.http.get<Array<DashboardData>>(URL)
      .pipe(
        map(
          resp =>{
            return resp
          }
        )
      )
  }

  getUserId(email: string){
    var URL = `http://localhost:4000/api/user/getID/` + email
    return this.http.get<number>(URL)
      .pipe(
        map(
          resp =>{
            return resp
          }
        )
      )
  }

  //Errores
  apiNotEnabled() {
    console.log("Error")
  }


}
