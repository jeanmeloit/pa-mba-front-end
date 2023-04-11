import { TestBed } from '@angular/core/testing';

import { SystemContainerService } from './system-container.service';

describe('SystemContainerService', () => {
  let service: SystemContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
