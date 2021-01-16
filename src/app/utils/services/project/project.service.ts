import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'project/all',
      null,
      true
    );
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      'project',
      values,
      true
    );
  }

  async findAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'project',
      null,
      true
    );
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'project',
      values,
      true
    );
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      'project',
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
      case 410:
        this._translateService
          .get('There is no such project ID in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please enter correct project information !')
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
