import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { DataSharingService } from 'src/app/services/dataManagement/data-sharing.service';
import { DatabaseService } from 'src/app/services/dataManagement/database.service';
import { MsSignInService } from 'src/app/services/ms-sign-in.service';

import { navbarData } from './nav-data';

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
  selector: 'app-sidebar-superuser',
  templateUrl: './sidebar-superuser.component.html',
  styleUrls: ['./sidebar-superuser.component.css'],
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
export class SidebarSuperuserComponent implements OnInit {
  profile!: ProfileType
  imageSrc = 'https://yt3.ggpht.com/a/AGF-l79b_9Tw9iTZ9nM_qOeACpuCz3kUc1EWEsgKUQ=s900-mo-c-c0xffffffff-rj-k-no'  
  imageAlt = 'Inflection Point'


  isSideNavCollapsed = false;
  screenWidth = 0;

  isMenuOpened: boolean = false;

  currentReleasedStatus: number = -1
  currentUpdateStatus: number = 0
  subscription?: Subscription

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  navData = navbarData;

  constructor(
    private msSignIn: MsSignInService
  ) { }


  
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

  onToggleSideNavFunction(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.msSignIn.getProfile().subscribe(resp => this.profile = resp);
    this.msSignIn.verifyPage(2);
  }

  logout() { // Add log out function here
    this.msSignIn.logout()
  }

}
