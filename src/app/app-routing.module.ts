import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utils/guards';
import {
  ClientLayoutComponent,
  AdminLayoutComponent,
} from './components/layouts';
import {
  HomepageComponent,
  DashboardComponent,
  LoginComponent,
  IssuesComponent,
  UserListComponent,
  AddUserComponent,
  ProjectsComponent,
  UsersComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ClientLayoutComponent,
    children: [
      { path: '', component: ProjectsComponent },
      {
        path: 'users/:Id',
        component: UsersComponent,
        data: { title: 'User List' },
      },
      {
        path: 'issues/:Id',
        component: IssuesComponent,
        data: { title: 'Issues Board' },
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'users',
        component: UserListComponent,
        data: { title: 'User List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'user/add',
        component: AddUserComponent,
        data: { title: 'User Add', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'user/profile',
        component: AddUserComponent,
        data: { title: 'User Profile', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'user/edit/:Id',
        component: AddUserComponent,
        data: { title: 'User Edit', icon: 'fa fa-2x fa-home' },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  AdminLayoutComponent,
  ClientLayoutComponent,
  DashboardComponent,
  IssuesComponent,
  HomepageComponent,
  LoginComponent,
];
