import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../utils/services';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-password-control-window',
  templateUrl: './password-control-window.component.html',
  styleUrls: ['./password-control-window.component.scss'],
})
export class PasswordControlWindowComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _authService: AuthService,
    private _dialogRef: MatDialogRef<PasswordControlWindowComponent>
  ) {}

  _passwordShowHide: boolean = false;
  _model: User = new User();
  ngOnInit(): void {}

  async onSubmit(passwordControlForm: NgForm) {
    try {
      if (passwordControlForm.valid) {
        await this._authService.passwordControl(passwordControlForm.value);
        this._dialogRef.close(passwordControlForm.value);
      } else {
        let message;
        this._translateService
          .get('Please fill in the required fields')
          .subscribe((value) => (message = value));
        this._snackBar.open(message, 'X', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'notification__error',
        });
      }
    } catch (error) {
      this._authService.errorNotification(error);
    }
  }
}
