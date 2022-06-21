import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

//Router
import { Routes } from '@angular/router';
import { EmployeeHomeComponent } from '../../employee/employee-home/employee-home.component';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';

const routes: Routes = [
  {
    path: 'home',
    component: EmployeeHomeComponent
  }
]

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isIframe = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private msSignIn: MsSignInService) {}

  ngOnInit(): void {
  }

  login(){
    this.msSignIn.login()
  }
  
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}

