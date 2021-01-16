import { Component, OnInit, Inject } from '@angular/core';
import { Project } from 'src/app/models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../utils/services';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _projectService: ProjectService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  _model: Project=new Project();
  _blogMenuListRenew: boolean = false;
  _action: Function;
  disableButton:boolean=false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._projectService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._blogMenuListRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(addProjectForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (addProjectForm.valid) {
      this._translateService
        .get('Project registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(addProjectForm))) return;
      this.dialogRef.close(this._blogMenuListRenew);
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
  async insertActionAsync(addProjectForm: NgForm) {
    try {
      this.disableButton=true;
      await this._projectService.insertAsync(addProjectForm.value);
      addProjectForm.resetForm();
      this._blogMenuListRenew = true;
      return true;
    } catch (error) {
      this.disableButton=false;
      this._projectService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(addProjectForm: NgForm) {
    try {
      await this._projectService.updateAsync(
        Object.assign(addProjectForm.value, {
          Id: this.data.Id,
        })
      );
      return true;
    } catch (error) {
      this._projectService.errorNotification(error);
      return false;
    }
  }

}
