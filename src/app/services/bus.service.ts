import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, catchError, throwError } from 'rxjs';
import { BusLocation, BusSearch } from '../interface/bus.interface';
import { BusScheduleListApi } from '../interface/busSchedule.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BusService {
  private readonly apiUrl: string = environment.apiUrl; //'http://localhost:8000/api/';

  busLocations$ = new BehaviorSubject<BusLocation[]>([]);

  constructor(private http: HttpClient) {

  }

  getLocations(): Observable<BusLocation[]> {
    return this.http.get<BusLocation[]>(this.apiUrl + "bus/location").pipe(
      catchError(err => {
        console.error('Error loading bus locations: ', err);
        return throwError(() => new Error('Failed to load bus locations'));
      })
    );
  }

  searchBus(params: BusSearch): Observable<BusScheduleListApi[]> {
    //console.log('url:...', this.apiUrl+ `bus/search/schedule?from_bus_location_id=${params.fromLocation}&to_bus_location_id=${params.toLocation}&schedule_date=${params.travelDate}`);

    // return this.http.get(this.apiUrl+ `bus/search/schedule?from_bus_location_id=${params.fromBusLocationId}&to_bus_location_id=${params.toBusLocationId}&schedule_date=${params.scheduleDate}`).pipe(
    //   catchError(err => {
    //     console.error('Error searching bus: ', err);
    //     return throwError(() => new Error("Failed to search bus"));
    //   })
    // );

    return this.http.get<BusScheduleListApi[]>(this.apiUrl+ `bus/search/schedule?
      from_bus_location_id=${params.fromBusLocationId}&to_bus_location_id=${params.toBusLocationId}&schedule_date=${params.scheduleDate}`)
      .pipe(
        catchError(err => {
          console.error('Error searching bus: ', err);
          return throwError(() => new Error("Failed to search bus"));
        })
      );
  }


}
