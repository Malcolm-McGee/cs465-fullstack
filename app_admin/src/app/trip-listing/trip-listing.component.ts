import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import { trips } from '../data/trips';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  // Declare the trip data service as a provider to this class
  providers: [TripDataService]
})
// Create class variable to hold the data
export class TripListingComponent implements OnInit{

  //trips: Array<any> = trips;
  // Define trips variable as an array of Trip objects
  trips: Trip[];
  message: string;
  
  // Inject the router instance into the class
  constructor(
    private tripDataService: TripDataService, 
    private router: Router,
    private authenticationService: AuthenticationService
    ) {}
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for Trips';
    this.tripDataService
      .getTrips()
        .then(foundTrips => {
          this.message = foundTrips.length > 0 ? "" : 'No trips found';
          // Store the returned trips in local class variable
          this.trips = foundTrips;
            });
  }
  // Uses the router to navigate to the add-trip component
  private addTrip(): void {
    console.log('Inside TripListingComponent#addTrip');
    this.router.navigate(['add-trip']);
  }

  ngOnInit(): void {
    // Invoke the local getTrips() function when this class is
    // initialized
    this.getTrips();
  }
}