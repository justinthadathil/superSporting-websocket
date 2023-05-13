import { TestBed } from '@angular/core/testing';

import { SportServiceService } from './sport-service.service';

describe('SportServiceService', () => {
  let service: SportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
