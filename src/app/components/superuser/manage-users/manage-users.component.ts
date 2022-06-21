import { Component, OnDestroy, OnInit } from '@angular/core';

//Data service
import { DataSharingService } from 'src/app/services/dataManagement/data-sharing.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'
import { PopUpAddUserComponent } from '../pop-up-add-user/pop-up-add-user.component';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { ManageUsers } from 'src/app/models/db-user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class MANAGEUSERSComponent implements OnInit, OnDestroy {

  users?: Array<ManageUsers>;
  // message?: string;
  // subscription?: Subscription;

  constructor(
    private data: DataSharingService,
    private dialog: MatDialog,
    private db: DatabaseService
  ) { }

  ngOnInit(): void {
    this.db.getUsersSu().subscribe(resp => {
      for (var i in resp) {
        resp[i].SU_decision = resp[i].userType
      }
      this.users = resp;
    })
  }

  ngOnDestroy(): void {
    // this.subscription?.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(PopUpAddUserComponent, {
      width: '30%'
    });
  }

  updateData() {
    if (this.users != null) {
      console.log(this.users)
      this.db.updateUserType(this.users).subscribe(resp => {
        window.location.reload();
      })
    }
  }
}

// @Component({
//   selector: 'pop-up-add-user',
//   templateUrl: '../pop-up-add-user/pop-up-add-user.component.html'
// })
// export class PopUpAddUserComponent {
//   constructor
// }