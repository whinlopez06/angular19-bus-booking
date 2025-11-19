import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, catchError, throwError, map } from 'rxjs';
import { BusSchedule, BusScheduleListApi, BusScheduleList2Api } from '../interface/busSchedule.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusScheduleService {
  private readonly apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getBusScheduleById(scheduleId: number) : Observable<BusScheduleListApi>{

    return this.http.get<BusScheduleListApi[]>(this.apiUrl + `bus-schedule/booking/${scheduleId}`)
      .pipe(
        map(result => result[0]),
        catchError(err => {
          console.error('Error loading bus locations: ', err);
          return throwError(() => new Error('Failed to load bus locations'));
        })
      );
  }

  getBusSchedules(): Observable<BusScheduleList2Api[]> {
    return this.http.get<BusScheduleList2Api[]>(this.apiUrl + `bus-schedule/index`)
      .pipe(
        catchError(err => {
          console.error('Error get bus schedule list: ', err);
          return throwError(() => new Error("Failed to render bus schedule list"));
        })
      );
  }

  getBusSchedulesSummary() : Observable<any> {
    return this.http.get<any>(this.apiUrl + `bus-schedule/summary`)
      .pipe(
        catchError(err => {
          console.error('Error get bus schedule summary: ', err);
          return throwError(() => new Error("Failed to render bus schedule summary list"));
        })
      );
  }

  createBusSchedule(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}bus-schedule/store`, payload)
      .pipe(
        catchError(err => {
          console.error('Error creating schedule: ', err);
          return throwError(() => new Error("Failed to create schedule"));
        })
      );
  }

}
