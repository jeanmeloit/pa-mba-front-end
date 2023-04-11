import { TestBed } from '@angular/core/testing';

import { NotificationsContainerService } from './notifications-container.service';

describe('NotificationsContainerService', () => {
  let service: NotificationsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
