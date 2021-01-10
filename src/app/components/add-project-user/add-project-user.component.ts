import { Component, OnInit, Inject } from '@angular/core';
import { ProjectUser } from 'src/app/models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectUserService } from '../../utils/services';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project-user',
  templateUrl: './add-project-user.component.html',
  styleUrls: ['./add-project-user.component.scss']
})
export class AddProjectUserComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _projectUserService: ProjectUserService,
    private dialogRef: MatDialogRef<AddProjectUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  _model: ProjectUser=new ProjectUser();
  _projectUserListRenew: boolean = false;
  _action: Function;

  async ngOnInit() {
      this._projectUserListRenew = false;
      this._action = this.insertActionAsync;
  }

  async onSave(addProjectUserForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (addProjectUserForm.valid) {
      this._translateService
        .get('User registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(addProjectUserForm))) return;
      this.dialogRef.close(this._projectUserListRenew);
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

  async insertActionAsync(addProjectUserForm: NgForm) {
    try {
      await this._projectUserService.insertAsync(
        Object.assign(addProjectUserForm.value, {
          ProjectID: this.data,
        })
      );
      addProjectUserForm.resetForm();
      this._projectUserListRenew = true;
      return true;
    } catch (error) {
      this._projectUserService.errorNotification(error);
      return false;
    }
  }
}
