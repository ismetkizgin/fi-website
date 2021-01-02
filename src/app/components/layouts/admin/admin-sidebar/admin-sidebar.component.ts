import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  AdminSidebarItemService,
} from '../../../../utils/services';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent implements OnInit {
  menu: Array<any> = [];
  constructor(
    private _sidebarItemService: AdminSidebarItemService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._sidebarItemService.menu.forEach((parentMenu: any) => {
      if (
        !parentMenu.authorize ||
        parentMenu.authorize.indexOf(
          this._authService.currentUserValue.result.UserTypeName
        ) != -1
      ) {
        if (parentMenu.submenu != null)
          parentMenu.submenu.forEach((childMenu, index) => {
            if (
              childMenu.authorize != null &&
              childMenu.authorize.indexOf(
                this._authService.currentUserValue.result.UserTypeName
              ) === -1
            )
              parentMenu.submenu.splice(index, 1);
          });
        this.menu.push(parentMenu);
      }
    });
  }

  toggle(indis) {
    this.menu[indis].submenuShowHide = !this.menu[indis].submenuShowHide;
  }

  isActive(paths: string[]) {
    return paths.find((path) => (path == this._router.url ? true : false));
  }
}
