import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectUserComponent } from './add-project-user.component';

describe('AddProjectUserComponent', () => {
  let component: AddProjectUserComponent;
  let fixture: ComponentFixture<AddProjectUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
