import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; 
import { AuthResponse } from '../models/auth-response'; 
import { BROWSER_STORAGE } from '../storage';
import { Trip } from '../models/trips';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {
    this.baseUrl = 'http://localhost:3000/api';
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trips`, formData);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }

  // Add this method to fetch all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trips/${formData.code}`, formData);
  }

  // Authentication methods
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }
}