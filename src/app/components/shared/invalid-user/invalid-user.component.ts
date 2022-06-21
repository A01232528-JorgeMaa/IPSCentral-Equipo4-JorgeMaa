import { Component, OnInit } from '@angular/core';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invalid-user',
  templateUrl: './invalid-user.component.html',
  styleUrls: ['./invalid-user.component.css']
})
export class InvalidUserComponent implements OnInit {

  image: boolean = false

  constructor(
    private router: Router,
    private MsSignIn: MsSignInService
  ) { }

  ngOnInit(): void {
    /*
    this.logout()
    */
  }

  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async logout(){
    await this.delay(5000)
    //this.image = true
    //await this.delay(2000)
    this.router.navigateByUrl('/')
    this.MsSignIn.logout()

  }





}
