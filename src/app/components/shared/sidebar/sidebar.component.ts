import { OnDestroy } from '@angular/core';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import * as e from 'express';
import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/services/dataManagement/data-sharing.service';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';

import { navbarData } from './nav-data';
import { throws } from 'assert';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

type ProfileType = {
  givenName?: string;
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  mail?: string
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms', 
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms', 
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})

          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  profile!: ProfileType
  imageSrc = 'https://yt3.ggpht.com/a/AGF-l79b_9Tw9iTZ9nM_qOeACpuCz3kUc1EWEsgKUQ=s900-mo-c-c0xffffffff-rj-k-no'  
  imageAlt = 'Inflection Point'


  isSideNavCollapsed = false;
  screenWidth = 0;

  isMenuOpened: boolean = false;

  subscription?: Subscription
  currentUpdateStatus: number = 0
  currentReleasedStatus: number = -1

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  navData = navbarData;

  constructor(
    private msSignIn: MsSignInService,
    private dataSharingService: DataSharingService,
    private db: DatabaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.msSignIn.getProfile().subscribe(resp => {
      this.profile = resp
      if(this.profile != null){
        this.subscription = this.dataSharingService.currentUpdate.subscribe(resp => {
          this.currentUpdateStatus = resp
        })
      }
    })
    this.getReleasedStatus()
    this.msSignIn.verifyPage(0);
  }

  onResize(event: any) {
    this.isSideNavCollapsed = !this.isSideNavCollapsed
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  toggleCollapse(): void {
    this.isSideNavCollapsed = !this.isSideNavCollapsed
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.isSideNavCollapsed = !this.isSideNavCollapsed
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});

  }
  async fetchUpdate(){
    //Que tan frecuente tiene que ver la base de datos por actualizaciones.
    await this.delay(5000)
    this.db.getEmployeeUpdate(this.profile.mail ?? '').subscribe(resp => {
      if(resp != 0){
        this.dataSharingService.changeUpdateStatus(resp)
        this.db.getReceivedUpdate(this.profile.mail ?? '').subscribe(resp =>{
          this.dataSharingService.changeUpdateStatus(0)
        })
      }
    })
    
    this.fetchUpdate()
  }

  getReleasedStatus(){
    this.db.getReleasedStatus().subscribe(resp =>{
      this.currentReleasedStatus = resp
      if(resp == 1){
        this.fetchUpdate()
      }
      else{
        this.router.navigateByUrl('/info-not-available')
      }
    })
  }

  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  toggleMenu(): void{
    this.isMenuOpened = !this.isMenuOpened;
  }

  clickedOutside(): void{
    this.isMenuOpened = false;
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  

  logout() { // Add log out function here
    this.msSignIn.logout()
  }
}
