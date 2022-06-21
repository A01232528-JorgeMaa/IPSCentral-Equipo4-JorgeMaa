import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { filter, map } from 'rxjs';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINTPHOTO = 'https://graph.microsoft.com/v1.0/me/photo/$value'
type ProfileType = {
  givenName?: string;
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  mail?: string
};



@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})


export class EmployeeDetailsComponent implements OnInit {
  profile!: ProfileType;


  constructor(
    private http: HttpClient,
    private msalBroadcastService: MsalBroadcastService,
    private msSignIn: MsSignInService
  ) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        //console.log(result);
      });

    this.getProfile();
    this.getProfilePhoto();
  }



  getProfile(){

    this.msSignIn.getProfile().subscribe(resp => {
      this.profile = resp;
    });
  }

  getProfilePhoto(){
    // this.http.get(GRAPH_ENDPOINTPHOTO)
    //   .subscribe((blob) => {
    //     this
    //   })
  }

}
