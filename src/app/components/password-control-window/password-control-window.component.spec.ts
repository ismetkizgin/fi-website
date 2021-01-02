import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordControlWindowComponent } from './password-control-window.component';

describe('PasswordControlWindowComponent', () => {
  let component: PasswordControlWindowComponent;
  let fixture: ComponentFixture<PasswordControlWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordControlWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordControlWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
