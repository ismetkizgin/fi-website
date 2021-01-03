import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../utils/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { User, UserFormType } from '../../models';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    public router: Router
  ) {}
  model: User = new User();
  @Input() screenAverageState: boolean = true;
  formType: UserFormType = UserFormType.login;
  _passwordShowHide: boolean = false;

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this._authService.login(loginForm.value);
    } else {
      let errorMessage: string;
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (errorMessage = value));
      this._snackBar.open(errorMessage, 'X', {
        duration: 3000,
        panelClass: 'notification__error',
      });
    }
  }

  formTypeToggle(userFormType) {
    this.formType = userFormType;
  }

  async onSignUp(signUpForm: NgForm) {
    try {
      let notification: any = {
        message: '',
        panelClass: '',
      };
      if (signUpForm.valid) {
        this._translateService
          .get('User registration is complete')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__success';
        await this._authService.signUpAsync(signUpForm.value);
        signUpForm.resetForm();
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
    } catch (err) {
      this._authService.errorNotification(err);
    }
  }
}
