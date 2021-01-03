import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models';
import { ProjectService } from '../../../utils/services';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from 'src/app/components';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private _projectService: ProjectService,
    private _dialog: MatDialog
  ) { }

  projects: Array<Project>;

  async ngOnInit() {
    try{
      this.projects = <Array<Project>>await this._projectService.listAsync();
    }catch(error){
      this._projectService.errorNotification(error);
    }
  }

  openAddProject(Id = null) {
    this._dialog.open(AddProjectComponent, {
      width: "400px"
    })
  }

}
