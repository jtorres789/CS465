import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {

  trips: Trip[] = [];  // Initialize with an empty array
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getTrips(): void {
    // Assuming you want to fetch all trips, use appropriate method from service
    this.tripDataService.getTrips() // Ensure getTrips() method is implemented
      .subscribe({
        next: (value: Trip[]) => {
          this.trips = value;
          this.message = value.length > 0
            ? `There are ${value.length} trips available.`
            : 'There were no trips retrieved from the database.';
          console.log(this.message);
        },
        error: (error: any) => {
          console.error('Error fetching trips:', error);
        }
      });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTrips(); // Fetch trips when component initializes
  }
}
