import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService, ProjectUserService } from '../../utils/services';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Task, User } from 'src/app/models';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _taskService: TaskService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private _projectUserService: ProjectUserService,
  ) { }

  _model: Task = new Task();
  users: Array<User>;
  _blogMenuListRenew: boolean = false;
  _action: Function;
  _addUpdateControl: boolean = true;
  @Input() ProjectId = null;
  @Input() Id = null;
  @Input() model=null;

  async ngOnInit() {
    try {
      this.users = <Array<User>>await this._projectUserService.listAsync(this.ProjectId);
    } catch (error) {
      this._projectUserService.errorNotification(error);
    }
    if (this.Id != null) {
      try {
        this._addUpdateControl = false;
        this._model=this.model;
      } catch (error) {
        this._taskService.errorNotification(error);
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
        .get('Task registration completed')
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
      await this._taskService.insertAsync(
        Object.assign(addProjectForm.value, {
          ProjectID: this.ProjectId,
        })
      );
      addProjectForm.resetForm();
      this._blogMenuListRenew = true;
      return true;
    } catch (error) {
      this._taskService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(addProjectForm: NgForm) {
    try {
      await this._taskService.updateAsync(
        Object.assign(addProjectForm.value, {
          Id: this.Id,
        })
      );
      return true;
    } catch (error) {
      this._taskService.errorNotification(error);
      return false;
    }
  }

}
