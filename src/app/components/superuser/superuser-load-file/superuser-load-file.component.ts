import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, Regular_Team, Team360 } from 'src/app/models/userModels';
import { DataSharingService } from 'src/app/services/dataManagement/data-sharing.service';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { PopUpResetDatabaseComponent } from '../pop-up-reset-database/pop-up-reset-database.component';

@Component({
  selector: 'app-superuser-load-file',
  templateUrl: './superuser-load-file.component.html',
  styleUrls: ['./superuser-load-file.component.css']
})
export class SuperuserLoadFileComponent implements OnInit, OnDestroy {

  //Read file CSV
  csvRecords: any;
  userInput: Array<Array<string>> = [[]]
  header: boolean = false;
  file: File = {} as File;


  //Create user variables
  allUsers: User[] = []
  temporalTeam360: Array<Team360> = []
  allTeam360: Array<Team360> = []

  //Sharing data between views
  message?: Team360;
  //subscription?: Subscription;

  //Loading Progress

  // 0 -> Nothing
  // 1 -> File Uploaded
  // 2 -> File processed
  // 3 -> Uploaded users
  // 4 -> Uploaded teams
  // 5 -> Uploaded hours
  // 6 -> Uploaded 360teams


  fileProcessProgress: number = 0
  displayText: Array<string> = ['', 'Procesando archivo', 'Cargando Usuarios', 'Cargando Proyectos', 'Cargando Horas', 'Cargando Evaluaciones 360', '']
  displayPage: boolean = false

  status: boolean = false

  //Helps subscribing to the data
  ngOnInit(): void {

    this.db.getReleasedStatus().subscribe(resp => {
      if(resp == 1){
        this.status = true
      }
      else{
        this.status = false
      }
    }   
  )

    this.db.getProccessProgress().subscribe(resp => {
      this.fileProcessProgress = resp
      this.displayPage = true
    })
  }

  ngOnDestroy(): void {
    //this.subscription?.unsubscribe()
  }

  constructor(
    private data: DataSharingService,
    private db: DatabaseService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  // @ViewChild('fileImportInput') fileImportInput: any;
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;

  formatSize(size: number, decimal = 2) {
    if (size === 0) {
      return "0 bytes";
    }
    const k = 1024;
    const dm = decimal <= 0 ? 0 : decimal;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  fileBrowserHandler(file: any) {
    this.progressDisplay(file);
  }

  progressBarSim() {
    setTimeout(() => {
      const progressInterval = setInterval(() => {
        if (this.csvRecords.progress === 100) {
          clearInterval(progressInterval);
        }
        else {
          this.csvRecords.progress += 1;
        }
      }, 5);
    }, 1000);
  }

  progressDisplay(file: any) {
    file.progress = 0;
    this.csvRecords = file;
    this.fileDropEl.nativeElement.value = "";
    this.progressBarSim();
  }

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.file = files[0];
    this.fileBrowserHandler(this.file);
    this.header = (this.header as unknown as string) === 'true' || this.header === true;
  }

  uploadData() {
    this.getProgressFile()
    this.db.processFile(this.file).subscribe(resp => {
      console.log(resp)
    })
  }

  //Variable fileProcessProgress.
  // 0 -> Display upload screen
  // 1 -> File Uploaded and display loading
  // 2 -> File processed and display loading
  // 3 -> Uploaded users and display loading
  // 4 -> Uploaded teams and display loading
  // 5 -> Uploaded hours and display loading
  // 6 -> Uploaded 360teams and display done

  async getProgressFile() {
    if (this.fileProcessProgress < 6) {
      this.db.getProccessProgress().subscribe(resp => {
        this.fileProcessProgress = resp
        console.log("Consulta")
      })
      await this.delay(1000)
      this.getProgressFile()
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  visualizeTeams() {
    this.router.navigateByUrl('/superuser/visualize-teams')
  }

  viewDashboard(){
    this.router.navigateByUrl('/superuser/dashboard')
  }

  deleteDatabase() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true

    dialogConfig.data = {
      selection: false
    }

    const dialogRef = this.dialog.open(PopUpResetDatabaseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log("Borrar")
        this.db.deleteData().subscribe(resp => {
          console.log(resp)

          window.location.reload()
        })

      }
      else {
        console.log("No borrar")
      }
    })
  }
}