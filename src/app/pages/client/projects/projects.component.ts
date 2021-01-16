import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models';
import { ProjectService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent, DialogWindowComponent } from 'src/app/components';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private _projectService: ProjectService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  projects: Array<any>;
  searchText = '';
  paginationConfig = {
    id: 'users',
    itemsPerPage: 5,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.projects = <Array<any>>await this._projectService.findAsync();
    } catch (error) {
      console.log(error);
      this._projectService.errorNotification(error);
    }
    console.log(this.projects)
  }

  openProjectTransactions(Id = null) {
    const diologRef = this._dialog.open(AddProjectComponent, {
      width: '400px',
      data: Id==null?null:this.projects.find((project) => project.Id == Id),
    });

    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async projectDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the project ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._projectService.deleteAsync({ Id });
          this.projects.splice(
            this.projects.findIndex((project) => project.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Project information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));

          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._projectService.errorNotification(error);
        }
      }
    });
  }
}
