import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as e from 'express';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { PopUpLoadInfoComponent } from '../pop-up-load-info/pop-up-load-info.component';

@Component({
  selector: 'app-load-info',
  templateUrl: './load-info.component.html',
  styleUrls: ['./load-info.component.css']
})
export class LoadInfoComponent implements OnInit {

  //0- Display Loading
  //1- File not uploaded
  //2- Ready to Publish
  //3- File published
  display: number = 0

  ngOnInit(): void {
    this.db.getProccessProgress().subscribe(resp => {
      if(resp == 6){
        this.db.getReleasedStatus().subscribe(resp => {
          if(resp == 1){
            this.display = 3
          }
          else{
            this.display = 2
          }
        }   
        )
      }
      else{
         this.display = 1
      }
      
    })
    
  }

  constructor(
    public dialog: MatDialog,
    public db: DatabaseService,
    public router: Router
    ) { }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true

    dialogConfig.data = {
      selection: false
    }

    const dialogRef = this.dialog.open(PopUpLoadInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data == true){
        this.db.publishData().subscribe(resp => {
          if(resp == true){
            this.display = 3
          }
        })
      }
    })
  }

  viewLoadFile(){
    this.router.navigateByUrl('/superuser/load-file')
  }
}
