import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { ProjectUserService } from '../../../utils';
import { ActivatedRoute } from '@angular/router';
import {
  AddProjectUserComponent,
  DialogWindowComponent,
} from 'src/app/components';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private _projectUserService: ProjectUserService,
    private activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  users: Array<any>;
  searchText = '';
  Id: string;
  paginationConfig = {
    id: 'users',
    itemsPerPage: 20,
    currentPage: 1,
  };

  async ngOnInit() {
    const Id = this.activatedRoute.snapshot.paramMap.get('Id');
    this.Id = Id;
    try {
      this.users = <Array<User>>await this._projectUserService.listAsync(Id);
    } catch (error) {
      this._projectUserService.errorNotification(error);
    }
  }

  openAddProjectUser() {
    const diologRef = this._dialog.open(AddProjectUserComponent, {
      width: '400px',
      data: this.Id,
    });

    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async projectUserDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._projectUserService.deleteAsync({ Id });
          this.users.splice(
            this.users.findIndex((user) => user.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('User information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._projectUserService.errorNotification(error);
        }
      }
    });
  }
}
