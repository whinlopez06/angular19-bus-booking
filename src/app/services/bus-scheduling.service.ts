import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusSchedulingService {

  private readonly apiUrl: string = environment.apiUrl;


  constructor(private http: HttpClient) { }

}
