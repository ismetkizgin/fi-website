import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _authService: AuthService,
    private dialogRef:MatDialogRef<ChangePasswordComponent>
  ) { }

  _passwordShowHide: boolean = false;
  _model: User = new User();

  ngOnInit(): void {
  }

  async onSave(changePasswordForm: NgForm) {
    console.log(changePasswordForm.value)
    try {
      let notification: any = {
        message: '',
        panelClass: '',
      };
      if (changePasswordForm.valid) {
        this._translateService
          .get('The user password has been updated')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__success';
        await this._authService.changePassword(changePasswordForm.value);
        this.dialogRef.close();
      } else {
        this._translateService
          .get('Please fill in the required fields')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__error';
      }
      this._snackBar.open(notification.message, 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: notification.panelClass,
      });
    } catch (error) {
      this._authService.errorNotification(error);
    }
  }

}
