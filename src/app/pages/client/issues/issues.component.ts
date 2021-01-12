import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../../utils';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent, LogDetailComponent } from 'src/app/components';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  constructor(
    private _activateRoute: ActivatedRoute,
    private _taskService: TaskService,
    private _dialog: MatDialog
  ) { }

  tasks: Array<Task>;
  todos: Array<Task>;
  completed: Array<Task>;
  progresies: Array<Task>;
  tests: Array<Task>;

  async ngOnInit() {
    const ProjectId = this._activateRoute.snapshot.paramMap.get('Id')
    try {
      this.tasks = <Array<any>>await this._taskService.listAsync(ProjectId)
      this.listsUpdate();
    } catch (error) {
      this._taskService.errorNotification(error);
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
    this._taskService.updateAsync(Object.assign(
      {
        TaskStatusName: event.container.id,
        Id: event.container.data[event.currentIndex]["Id"],
      }
    ));
  }

  listsUpdate() {
    this.todos = this.tasks.filter(data => data.TaskStatusName == "TO DO")
    this.progresies = this.tasks.filter(data => data.TaskStatusName == "IN PROGRESS")
    this.tests = this.tasks.filter(data => data.TaskStatusName == "TEST")
    this.completed = this.tasks.filter(data => data.TaskStatusName == "DONE")
  }

  openTaskTransactions(Id=null) {
    this._dialog.open(LogDetailComponent,{
      width:"400px",
      data:{ProjectId:this._activateRoute.snapshot.paramMap.get('Id'),
      Id:Id,
       _model:this.tasks.find(
        (project) => project.Id == Id
      ),}
    })
  }

}
