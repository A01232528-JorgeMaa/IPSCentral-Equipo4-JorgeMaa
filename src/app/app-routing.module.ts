import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

//Superusuario


//Recursos humanos


//Empleado
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeeRequestComponent } from './components/employee/employee-request/employee-request.component';

//Shared
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { EmployeeNotificationsComponent } from './components/employee/employee-notifications/employee-notifications.component';
import { SuperuserLoadFileComponent } from './components/superuser/superuser-load-file/superuser-load-file.component';
import { SidebarSuperuserComponent } from './components/shared/sidebar-superuser/sidebar-superuser.component';
import { SidebarHumanresourcesComponent } from './components/shared/sidebar-humanresources/sidebar-humanresources.component';
import { MANAGEUSERSComponent } from './components/superuser/manage-users/manage-users.component';
import { SuperuserHomeComponent } from './components/superuser/superuser-home/superuser-home.component';
import { HrDashboardComponent } from './components/humanresources/hr-dashboard/hr-dashboard.component';
import { HrNotificationsComponent } from './components/humanresources/hr-notifications/hr-notifications.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { LoadInfoComponent } from './components/superuser/load-info/load-info.component';
import { InvalidUserComponent } from './components/shared/invalid-user/invalid-user.component';
import { HrApproveteamsComponent } from './components/humanresources/hr-approveteams/hr-approveteams.component';
import { SuperuserVisualizeTeamsComponent } from './components/superuser/superuser-visualize-teams/superuser-visualize-teams.component';
import { InfoNotAvailableComponent } from './components/shared/info-not-available/info-not-available.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'employee_details',
    component: EmployeeDetailsComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'info-not-available',
    component: InfoNotAvailableComponent
  },
  
  {
    path: 'userNotFound',
    component: InvalidUserComponent,
  },
  {
    path: 'home',
    component: SidebarComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: 'employee_home',
        component: EmployeeHomeComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'request',
        component: EmployeeRequestComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'details',
        component: EmployeeDetailsComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'notifications',
        component: EmployeeNotificationsComponent,
        canActivate: [MsalGuard]
      }
    ]
  },
  {
    path: 'superuser',
    component: SidebarSuperuserComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: 'load-file',
        component: SuperuserLoadFileComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'manage-users',
        component: MANAGEUSERSComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'dashboard',
        component: SuperuserHomeComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'confirm-load',
        component: LoadInfoComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'visualize-teams',
        component: SuperuserVisualizeTeamsComponent,
        canActivate: [MsalGuard]
      }
    ]
  },
  {
    path: 'hr',
    component: SidebarHumanresourcesComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: 'dashboard',
        component: HrDashboardComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'notifications',
        component: HrNotificationsComponent,
        canActivate: [MsalGuard]
      },
      {
        path: 'team-management',
        component: HrApproveteamsComponent,
        canActivate: [MsalGuard]
      }
    ]
  }
]

const isIFrame = window !== window.parent && !window.opener;

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIFrame ? 'enabled' : 'disabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

