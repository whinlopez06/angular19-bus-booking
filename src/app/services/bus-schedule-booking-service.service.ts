import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusScheduleBookingServiceService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  createNewBooking(objectParams:any[]) {
    console.log('createNewBooking - objectParams:...', objectParams);
    return this.http.post(this.apiUrl + `bus-schedule-booking/store`, objectParams)
      .pipe(
        catchError(err => {
          console.error('Error creating booking: ', err);
          return throwError(() => new Error("Failed to create booking"));
        })
      );
  }

  getBusBookedSeats(scheduledId: number) {
    return this.http.get(`${this.apiUrl}bus-schedule-booking/${scheduledId}`)
      .pipe(
        catchError(err => {
          console.error('Error creating booking: ', err);
          return throwError(() => new Error("Failed to create booking"));
        })
      );
  }

}
