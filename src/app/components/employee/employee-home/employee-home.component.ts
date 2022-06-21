import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DbUserTeam360 } from 'src/app/models/db-user';

//BASE DE DATOS
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';
import { DataSharingService } from 'src/app/services/dataManagement/data-sharing.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopUpConfirmTeamComponent } from '../pop-up-confirm-team/pop-up-confirm-team.component';
import { runInThisContext } from 'vm';

type ProfileType = {
  givenName?: string;
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  mail?: string
};
@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  profile!: ProfileType;
  allowEditing: Boolean = false

  //0 -> Huerfano
  //1 -> Tiene equipo - No puede editar
  //2 -> Tiene equipo - Puede editar
  //3 -> Tiene equipo - Su equipo esta confirmado
  status: number = 0

  displayTeam?: Array<DbUserTeam360>;
  statusDisplay: number = 0;

  imagePath: string = ""
  textStatus: string = ""


  //Data Sharing Service
  subscription?: Subscription;

  constructor(
    private router: Router,
    private db: DatabaseService,
    private msSignIn: MsSignInService,
    private dataSharingService: DataSharingService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

    //Obtenemos el perfil de Microsoft, con esto obtenemos el Correo, con el cual cuando se obtiene una respuesta
    //se llama a la funcion this.db.getEmployeeTeam(), esto obtiene el equipo 360 del empleado con el correo correspondiente.
    this.loadData()

    //Si se recibe una actualizacion, entonces actualiza la informacion
    this.subscription = this.dataSharingService.currentUpdate.subscribe(resp => {
      if(resp != 0){
        console.log("Cargar informacion")
        this.loadData()
      }
    })
  }

  loadData(){
    this.msSignIn.getProfile().subscribe(resp => {
      this.profile = resp
      //Obtenemos el Equipo360.
      this.db.getEmployeeTeam(resp.mail ?? '').subscribe(resp => {
        //Si la respuesta tiene elementos.
        if(resp.length > 0){

          //rhApproved -> True, el equipo esta listo para la evaluacion.
          //rhApproved -> False, el equipo aun falta por ser confirmado.
          var rhApproved = true
          this.displayTeam = resp
        
          

          //Ciclamos por todo el equipo
          for(var i in this.displayTeam){
            //Si encuentra uno que no este confirmado, entonces no esta listo la evaluacion360
            if(!this.displayTeam[i].Approved || this.displayTeam[i].Approved == null){
              rhApproved = false
            }
            //Si encuentra algun valor NULL, entonces lo guarda como TRUE.
            if(this.displayTeam[i].Check1 == null){
              this.displayTeam[i].Check1 = true
            }
          }
          //Consultamos el estado de edicion.
          //True -> Puede editar y realizar peticiones.
          //False -> No puede editar ni realizar peticiones.
          this.db.getEmployeeEditing(this.profile.mail ?? '').subscribe(resp => {
            this.allowEditing = resp
            //Si el equipo no fue aprobado, entonces YA CONFIRMO SU EQUIPO o TODAVIA NO CONFIRMA SU EQUIPO
            if(!rhApproved){
              this.statusDisplay = 2
              if(this.allowEditing){
                this.imagePath = "warningIcon.png"
                this.textStatus = "Todavia no has confirmado tu equipo."
              }
              else{
                this.imagePath = "confirmedIcon.png"
                this.textStatus = "Ya confirmaste tu equipo. Espera a que recursos humanos revise tu equipo."
              }
            }
            else{
              this.allowEditing = false
              this.statusDisplay = 2
              this.imagePath = "approvedTeamIcon.png"
              this.textStatus = "Ya puedes empezar tu Evaluación360."
            }
          })
        }
        else{
          this.statusDisplay = 1
        }
      })
    })
  }
   
  confirmTeam(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true

    dialogConfig.data = {
      selection: false,
      inputTeam: this.displayTeam
    }

    const dialogRef = this.dialog.open(PopUpConfirmTeamComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog Output: " + data)
      if(data == true){
        this.saveData()
      }
      else{
        
      }
      }
    )
  }

  saveData(){
    this.db.postEmployeeTeam360(this.displayTeam ?? [], 1).subscribe(resp => {
      this.db.getEmployeeEditing(this.profile.mail ?? '').subscribe(resp => {
        this.allowEditing = false
        this.loadData()
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }


  displayRequest(){
    this.router.navigateByUrl('/home/request')
  }


  
}
