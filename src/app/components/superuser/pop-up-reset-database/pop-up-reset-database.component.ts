import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-reset-database',
  templateUrl: './pop-up-reset-database.component.html',
  styleUrls: ['./pop-up-reset-database.component.css']
})
export class PopUpResetDatabaseComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PopUpResetDatabaseComponent>,
    @Inject(MAT_DIALOG_DATA) data: boolean
  ) { 
    this.input = data
  }

  input: any
  selection: boolean = false
  ngOnInit(): void {
    
  }

  close(){
    this.selection = false
    this.dialogRef.close(this.selection);
  }

  reset(){
    this.selection = true
    this.dialogRef.close(this.selection);
  }

}
