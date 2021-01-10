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
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private _projectService: ProjectService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
  ) { }

  projects: Array<Project>;

  async ngOnInit() {
    try{
      this.projects = <Array<Project>>await this._projectService.findAsync();
    }catch(error){
      console.log(error)
      this._projectService.errorNotification(error);
    }
  }

  openProjectTransactions(Id = null) {
    this._dialog.open(AddProjectComponent, {
      width: "400px",
      data: this.projects.find(
        (project) => project.Id == Id
      ),
    })
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
