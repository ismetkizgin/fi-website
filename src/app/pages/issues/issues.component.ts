import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'Drag & Drop in Angular 7';
  website = 'https://samorgill.com';

  todos = [
    {
      name: 'Angular page designs try revise deneme deneme',
      category: 'Web Development'
    },
    {
      name: 'Flexbox',
      category: 'Web Development'
    },
    {
      name: 'iOS',
      category: 'App Development'
    },
    {
      name: 'Java',
      category: 'Software development'
    }
  ];

  completed = [
    {
      name: 'Android',
      category: 'Mobile Development'
    },
    {
      name: 'MongoDB',
      category: 'Databases'
    },
    {
      name: 'ARKit',
      category: 'Augmented Reality'
    },
    {
      name: 'React',
      category: 'Web Development'
    }
  ];

  progresies = [
    {
      name: 'progress1',
      category: 'Web Development'
    },
    {
      name: 'progress2',
      category: 'Web Development'
    },
    {
      name: 'progress3',
      category: 'App Development'
    },
    {
      name: 'progress4',
      category: 'Software development'
    }
  ];

  tests = [
    {
      name: 'test1',
      category: 'Mobile Development'
    },
    {
      name: 'test2',
      category: 'Databases'
    },
    {
      name: 'test3',
      category: 'Augmented Reality'
    },
    {
      name: 'test4',
      category: 'Web Development'
    }
  ];

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.data)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
    console.log(event.container.data[event.currentIndex])
    console.log(this.todos)
    console.log(this.progresies)
  }

}
