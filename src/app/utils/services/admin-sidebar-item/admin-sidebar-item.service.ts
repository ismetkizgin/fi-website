import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../models/';

@Injectable({
  providedIn: 'root',
})
export class AdminSidebarItemService {
  constructor(private _router: Router) {}

  _url = this._router.routerState.snapshot.url;
  menu: Array<object> = [
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      link: '/admin',
    },
    {
      title: 'User Transactions',
      icon: 'fa fa-user',
      linkActive: ['/admin/users', '/admin/user/add'],
      submenuShowHide: this.getChildUrlActiveState(['user', 'users']),
      submenu: [
        {
          title: 'User List',
          icon: 'fa fa-address-book',
          link: '/admin/users',
        },
        {
          title: 'User Add',
          icon: 'fa fa-user-plus',
          link: '/admin/user/add',
        },
      ],
      authorize: [Roles.Root],
    },
    {
      title: 'Institution Transactions',
      icon: 'fa fa-building',
      linkActive: ['/admin/institutions', '/admin/institution/add'],
      submenuShowHide: this.getChildUrlActiveState([
        'institution',
        'institutions',
      ]),
      submenu: [
        {
          title: 'Institution List',
          icon: 'fa fa-map',
          link: '/admin/institutions',
        },
        {
          title: 'Institution Add',
          icon: 'fa fa-plus-square',
          link: '/admin/institution/add',
        },
      ],
      authorize: [Roles.Root],
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
