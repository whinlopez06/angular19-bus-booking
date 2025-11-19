import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSchedulingComponent } from './bus-scheduling.component';

describe('BusSchedulingComponent', () => {
  let component: BusSchedulingComponent;
  let fixture: ComponentFixture<BusSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusSchedulingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
