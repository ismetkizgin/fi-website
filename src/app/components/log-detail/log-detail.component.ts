import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskLogService } from '../../utils';
import { TaskLog } from '../../models';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss'],
})
export class LogDetailComponent implements OnInit {
  constructor(
    private _activateRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _taskLogService: TaskLogService
  ) {}

  logControl: boolean = false;
  ProjectId = this.data.ProjectId;
  Id = this.data.Id;
  _model = this.data._model;
  taskLogs: Array<TaskLog>;
  searchText = '';
  paginationConfig = {
    id: 'logs',
    itemsPerPage: 5,
    currentPage: 1,
  };

  async ngOnInit() {
    if (this.Id != null) {
      this.logControl = true;
      try {
        this.taskLogs = <Array<TaskLog>>(
          await this._taskLogService.listAsync(this.Id)
        );
      } catch (error) {
        this._taskLogService.errorNotification(error);
      }
    }
  }
}
