import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../change-password/change-password.component';
import { AuthService } from '../../../../utils';

@Component({
  selector: 'app-client-banner',
  templateUrl: './client-banner.component.html',
  styleUrls: ['./client-banner.component.scss']
})
export class ClientBannerComponent implements OnInit {

  constructor(
    private _dialog: MatDialog, 
    private _authService: AuthService
  ) { }

  userInformation = this._authService.currentUserValue?.result;

  ngOnInit(): void {
    console.log(this.userInformation)
  }

  async signout() {
    await this._authService.logout();
  }

  openPasswordChangeWindow() {
    this._dialog.open(ChangePasswordComponent, {
      width: '400px',
    });
  }

}
