import { Component, OnInit } from '@angular/core';
import { DialogWindowComponent } from 'src/app/components';
import { ProjectService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../../../models';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(
    private _projectService: ProjectService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
  ) { }

  projects:any;
  searchText="";

  async ngOnInit() {
    try{
      this.projects=<Array<Project>> await this._projectService.listAsync();
    }catch(error){
      this._projectService.errorNotification(error);
    }
  }

  async projectDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the user ?',
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
