import { TestBed } from '@angular/core/testing';

import { BusSchedulingService } from './bus-scheduling.service';

describe('BusSchedulingService', () => {
  let service: BusSchedulingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusSchedulingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
