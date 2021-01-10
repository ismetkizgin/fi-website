import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { ProjectUserService } from '../../../utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private _projectUserService: ProjectUserService,
    private activatedRoute: ActivatedRoute
  ) { }

  users: Array<any>;
  searchText="";
  paginationConfig = {
    id: 'users',
    itemsPerPage: 20,
    currentPage: 1,
  };

  async ngOnInit() {
    const Id= this.activatedRoute.snapshot.paramMap.get('Id');
    try{
      this.users= <Array<User>> await this._projectUserService.listAsync(Id);
    }catch(error){
      this._projectUserService.errorNotification(error)
    }
  }

}
