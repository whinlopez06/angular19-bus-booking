import { TestBed } from '@angular/core/testing';

import { BusScheduleBookingServiceService } from './bus-schedule-booking-service.service';

describe('BusScheduleBookingServiceService', () => {
  let service: BusScheduleBookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusScheduleBookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
