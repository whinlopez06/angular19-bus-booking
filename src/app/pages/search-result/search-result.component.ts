import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { BusService } from '../../services/bus.service';
import { BusSearch } from '../../interface/bus.interface';
import { BusSchedule } from '../../interface/bus.interface';
import { BusScheduleListApi } from '../../interface/busSchedule.interface';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TimeDifferencePipe } from '../../pipes/time-difference.pipe';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-search-result',
  imports: [FormsModule, TimeDifferencePipe, RouterLink, DatePipe],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  busService = inject(BusService);


  searchObject: BusSearch = {
    fromBusLocationId: 0,
    toBusLocationId: 0,
    scheduleDate: null
  }

  busScheduleLists: BusScheduleListApi[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe((result: any) => {
    //   console.log('activatedRoute - result:...', result);
    //   this.searchObject.fromBusLocationId = result.fromId;
    //   this.searchObject.toBusLocationId = result.toId;

    //   console.log('searchObject:...', this.searchObject);
    //   this.busService.searchBus(this.searchObject).pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((result: BusScheduleListApi[]) => {
    //     console.log('result of searchBus subs:...', result);
    //     this.busScheduleLists = result;
    //   });
    // });

    this.route.queryParams.subscribe(params => {
      this.searchObject.fromBusLocationId = params['fromId'];
      this.searchObject.toBusLocationId = params['toId'];
      this.searchObject.scheduleDate = params['schedDate'];

      this.busService.searchBus(this.searchObject).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: BusScheduleListApi[]) => {
        console.log('result of searchBus subs:...', result);
        this.busScheduleLists = result;
      });

    })

  }

}
