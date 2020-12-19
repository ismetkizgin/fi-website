import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AdminSidebarItemService } from '../../../../utils/services';

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
    this._sidebarItemService.menu.forEach((item: any) => {
      if (
        !item.authorize ||
        item.authorize.indexOf(
          this._authService.currentUserValue.result.UserStatusName
        ) != -1
      )
        this.menu.push(item);
    });
  }

  toggle(indis) {
    this.menu[indis].submenuShowHide = !this.menu[indis].submenuShowHide;
  }

  isActive(paths: string[]) {
    return paths.find((path) => (path == this._router.url ? true : false));
  }
}
