import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { PopUpLoadInfoComponent } from '../pop-up-load-info/pop-up-load-info.component';

@Component({
  selector: 'app-pop-up-load-info',
  templateUrl: './pop-up-load-info.component.html',
  styleUrls: ['./pop-up-load-info.component.css']
})
export class PopUpLoadInfoComponent implements OnInit {

  data: any

  constructor(
    private dialogRef: MatDialogRef<PopUpLoadInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data: boolean
  ) { 
    this.data = data
  }

  ngOnInit(): void {
  }

  publish(){
    this.data.selection = true
    this.dialogRef.close(this.data.selection)
  }

  close(){
    this.data.selection = false
    this.dialogRef.close(this.data.selection)
  }

  //constructor(private dialogRef: MatDialog) { }

  // openDialog() {
  //   this.dialogRef.open(PopUpLoadInfoComponent);
  // }

}
