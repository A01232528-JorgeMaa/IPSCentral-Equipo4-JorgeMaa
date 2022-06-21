import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationData, getConflictData } from 'src/app/models/db-user';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';

@Component({
  selector: 'app-hr-pop-up-conflict',
  templateUrl: './hr-pop-up-conflict.component.html',
  styleUrls: ['./hr-pop-up-conflict.component.css']
})
export class HrPopUpConflictComponent implements OnInit {

  data: any
  conflict: Array<NotificationData> = []

  saveResponse: boolean = false

  conflictType: number = 0

  titleDisplay: string = ''
  statusDisplay: string = ''
  displayTable: boolean = false
  conflictStatus: boolean = false

  constructor(
    //Se supone que la variable 'data' no tiene que tener ningun tipo de variable, segun la pagina de Angular es de tipo Any.
    //Pero el codigo no funciona si no se agrega el tipo de dato despues del 'data:'
    //WTF Angular
    private dialogRef: MatDialogRef<HrPopUpConflictComponent>,
    @Inject(MAT_DIALOG_DATA) inputDialog: boolean
  ) { 
    this.data = inputDialog
  }

  ngOnInit(): void {
    this.conflict = this.data.newUser.Notification 
    this.conflictType = this.data.newUser.warning
    this.conflictStatus = this.data.newUser.Notification[0].Status

    if(this.conflictStatus){
      this.statusDisplay = 'Resuelto'
    }
    else{
      this.statusDisplay = 'No resuelto'
    }


    switch(this.conflictType){
      case 0:
        this.titleDisplay = 'Modificar relacion'
        break
      case 1:
        this.titleDisplay = 'Modificar relacion'
        break
      case 2:
        this.titleDisplay = 'Conflicto'
        this.displayTable = true
        break
      case 3:
        this.titleDisplay = 'Modificar relacion'
        break
      default:
        break
    }
  }

  checkMessage(){
    this.saveResponse = false
    for(var i in this.conflict){
      if(this.conflict[i].HrResponse?.length ?? 0 > 0){
        this.saveResponse= true
      }
    }
  }

  save(){
    this.dialogRef.close(this.conflict)
  }

}
