import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { Observable, takeUntil } from 'rxjs';
import { AsyncPipe, DatePipe  } from '@angular/common';
import { BusLocation } from '../../interface/bus.interface';
import { BusSearch } from '../../interface/bus.interface';
import { SearchBus } from '../../models/SearchBus.model';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BusScheduleService } from '../../services/bus-schedule.service';

@Component({
  selector: 'app-search',
  imports: [AsyncPipe, FormsModule, DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  busService = inject(BusService);
  busScheduleService = inject(BusScheduleService);
  router = inject(Router);
  private destroyRef = inject(DestroyRef);

  searchObject: BusSearch = {
    fromBusLocationId: 0,
    toBusLocationId: 0,
    scheduleDate: ""
  }
  //searchObject2: SearchBus = new SearchBus();

  busLocationList: BusLocation[] = [];
  busLocations$: Observable<BusLocation[]> = new Observable<BusLocation[]>; // you can create a c
  searchBusResult: any;
  busScheduleSummaryList: any;
  today: string = "";

  constructor() {
  }

  ngOnInit(): void {
      this.getAllLocations();
      this.loadBusSchedulesSummary();
      this.today = new Date().toISOString();
  }

  getAllLocations(){
    // this.busLocations$ = this.busService.getLocations();
    this.busService.getLocations().pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: busLocations => {
        this.busLocationList = busLocations;
      },
      error: err => {
        console.log(err.message || 'Something went wrong');
      }
    });

  }

  loadBusSchedulesSummary() {
    this.busScheduleService.getBusSchedulesSummary()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response: any) => {
      this.busScheduleSummaryList = response;
      console.log('busScheduleSummaryList:...', this.busScheduleSummaryList);
    });
  }


  onSelectFromLocation(e: any): void {
    const element = e.target;
    const indx: any = element.value;

    console.log('element:...', element);
    console.log('indx:...', indx);
  }

  searchBus() {
    // this.busService.searchBus(this.searchObject).pipe(takeUntilDestroyed(this.destroyRef))
    // .subscribe((result: any) => {
    //   console.log('result:...', result);
    //   this.searchBusResult = result;
    // });
    //console.log('searchObject:... ', this.searchObject); return;

    // this.router.navigate(['/search-result',
    //   this.searchObject.fromBusLocationId,
    //   this.searchObject.toBusLocationId,
    //   this.searchObject.scheduleDate
    // ]);
    const fromId = this.searchObject.fromBusLocationId;
    const toId = this.searchObject.toBusLocationId;
    const schedDate = this.searchObject.scheduleDate

    this.router.navigate(['/search-result'], {
      queryParams: { fromId, toId, schedDate}
    }
    );
  }

  navigateToBooking(scheduleId: number) {

  }

}
