import { TestBed } from '@angular/core/testing';

import { AdminSidebarItemService } from './admin-sidebar-item.service';

describe('AdminSidebarItemService', () => {
  let service: AdminSidebarItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSidebarItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
