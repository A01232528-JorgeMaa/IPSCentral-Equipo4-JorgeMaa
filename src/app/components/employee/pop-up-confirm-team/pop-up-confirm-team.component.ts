import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbUserTeam360 } from 'src/app/models/db-user';

@Component({
  selector: 'app-pop-up-confirm-team',
  templateUrl: './pop-up-confirm-team.component.html',
  styleUrls: ['./pop-up-confirm-team.component.css']
})
export class PopUpConfirmTeamComponent implements OnInit {

  inputDialog: any
  input: Array<DbUserTeam360> = []
  selection: boolean = false

  displayRequest: Array<DbUserTeam360> = []

  constructor(
    private dialogRef: MatDialogRef<PopUpConfirmTeamComponent>,
    //Se supone que la variable 'data' no tiene que tener ningun tipo de variable, segun la pagina de Angular es de tipo Any.
    //Pero el codigo no funciona si no se agrega el tipo de dato despues del 'data:'
    //WTF Angular
    @Inject(MAT_DIALOG_DATA) data: boolean
    ) 
    { 
      //Pasamos el data al inputDialog de Any. Ahi podemos accer a toda la informacion en el codigo.
      this.inputDialog = data
    }

  ngOnInit(): void {
    //En el init pasamos el inputDialog con las variables que declaramos de Employee_Home, ahi se obtiene la informacion
    //Las variables fueron declaradas en la linea 141.
    this.input = this.inputDialog.inputTeam
    this.selection = this.inputDialog.selection
    for(var i = 0; i < this.input.length; i++){
      if(this.input[i].Approved == null && this.input[i].Check1 == false){
        this.displayRequest.push(this.input[i])
      }
    }
    console.log("Rechazado.")
    console.log(this.displayRequest)
  }

  save(){
    this.selection = true
    this.dialogRef.close(this.selection);
  }

  close(){
    this.selection = false
    this.dialogRef.close(this.selection);
  }

}
