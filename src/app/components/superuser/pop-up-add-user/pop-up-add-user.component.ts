import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { addNewUser } from 'src/app/models/db-user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-add-user',
  templateUrl: './pop-up-add-user.component.html',
  styleUrls: ['./pop-up-add-user.component.css']
})
export class PopUpAddUserComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PopUpAddUserComponent>,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {

  }


  sendData(email: string, name: string, rh: boolean): void {
    var user: addNewUser = {
      Email: email,
      Name: name,
      IsHR: rh
    }
    this.db.addUser(user).subscribe(resp => {
      console.log(resp);
      this.dialogRef.close();
      window.location.reload();
    })
  }



}
