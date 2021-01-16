import { Component, OnInit } from '@angular/core';
import { User } from '../../../models';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from '../../../models/roles';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService, LanguageService } from '../../../utils';
import { PasswordControlWindowComponent } from 'src/app/components';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _languageService: LanguageService,
    private _dialog: MatDialog,
    public _router: Router,
  ) {}

  _passwordShowHide: boolean = false;
  _model: User = new User();
  _action: Function;
  disableButton=false;
  _UserTypeName = this._authService.currentUserValue.result.UserTypeName;
  lang: string = this._languageService.getLanguage() || 'tr';
  userRoles: Array<object> = [
    {
      userTypeName: 'Administrator',
      authorize: [Roles.Root].indexOf(this._UserTypeName) === -1 ? false : true,
    },
    {
      userTypeName: 'Manager',
      authorize:
        [Roles.Root, Roles.Administrator].indexOf(this._UserTypeName) === -1
          ? false
          : true,
    },
    {
      userTypeName: 'Staff',
      authorize:
        [Roles.Root, Roles.Administrator].indexOf(this._UserTypeName) === -1
          ? false
          : true,
    }
  ];

  async ngOnInit() {
    const Id = this._activatedRoute.snapshot.paramMap.get('Id');
    if (Id != null) {
      try {
        this._model = <any>await this._userService.findAsync(Id);
      } catch (error) {
        this._userService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else if (this._router.isActive('/admin/user/profile', true)) {
      this._model = JSON.parse(
        JSON.stringify(this._authService.currentUserValue.result)
      );
      this._model.UserTypeName = null;
      this._model.Password=null;
      this._action = this.updateProfileActionAsync;
    } else {
      this._action = this.insertActionAsync;
    }
  }
  async onSave(userForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (userForm.valid) {
      this._translateService
        .get('User registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(userForm))) return;
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
  }
  onAutomaticPasswordGeneration(): void {
    this._model.Password = this._authService.creatingPassword(8);
    this._passwordShowHide = true;
  }
  onPasswordToggle(): void {
    if (this._passwordShowHide) this._passwordShowHide = false;
    else this._passwordShowHide = true;
  }

  async insertActionAsync(userForm: NgForm) {
    try {
      this.disableButton=true;
      await this._userService.insertAsync(userForm.value);
      userForm.resetForm();
      return true;
    } catch (error) {
      this.disableButton=false;
      this._userService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(userForm: NgForm) {
    try {
      await this._userService.updateAsync(
        Object.assign(userForm.value, {
          Id: parseInt(
            this._activatedRoute.snapshot.paramMap.get('Id')
          ),
        })
      );
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  async updateProfileActionAsync(userForm: NgForm) {
    try {
      await this._authService.updateProfile(userForm.value);
      this._model.Password = null;
      return true;
    } catch (error) {
      this._userService.errorNotification(error);
      return false;
    }
  }

  myAccountDelete() {
    const diologRef = this._dialog.open(PasswordControlWindowComponent, {
      width: '400px',
    });

    diologRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        try {
          await this._authService.deleteProfile(result);
          let message;
          this._translateService
            .get('Your account has been deleted')
            .subscribe((value) => (message = value));
          this._snackBar.open(message, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'notification__success',
          });
          this._authService.logout();
          this._router.navigateByUrl('login');
        } catch (error) {
          this._authService.errorNotification(error);
        }
      }
    });
  }
}
