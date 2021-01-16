import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  async listAsync(ProjectId) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `task/${ProjectId}`,
      null,
      true
    );
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      'task',
      values,
      true
    );
  }

  async findAsync(taskID) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `task/${taskID}`,
      null,
      true
    );
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'task',
      values,
      true
    );
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      'task',
      values,
      true
    );
  }

  errorNotification(error) {
    let errorMessage: string;
    switch (error.status) {
      case 401:
        this._translateService
          .get('Unauthorized transaction !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 404:
        this._translateService
          .get('There is no such project ID in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 410:
        this._translateService
          .get('There is no such task ID in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please enter correct task information !')
          .subscribe((value) => (errorMessage = value));
        break;
      default:
        this._translateService
          .get(
            'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
          )
          .subscribe((value) => (errorMessage = value));
        break;
    }
    this._snackBar.open(errorMessage, 'X', {
      duration: 4000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
