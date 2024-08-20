import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"; 
import { Router } from "@angular/router"; 
import { TripDataService } from '../services/trip-data.service'; 
import { Trip } from '../models/trips';

@Component({ 
  selector: 'app-edit-trip', 
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './edit-trip.component.html', 
  styleUrls: ['./edit-trip.component.css'] // Corrected to 'styleUrls'
}) 

export class EditTripComponent implements OnInit { 
  public editForm!: FormGroup; 
  trip!: Trip; 
  submitted = false; 
  message: string = ''; 

  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private tripDataService: TripDataService 
  ) { } 

  ngOnInit() { 
    // Retrieve stashed trip ID 
    const tripCode = localStorage.getItem("tripCode"); 
    if (!tripCode) { 
      alert("Something went wrong, couldn't find the tripCode!"); 
      this.router.navigate(['']); 
      return; 
    } 

    console.log('EditTripComponent::ngOnInit'); 
    console.log('tripCode: ' + tripCode); 

    this.editForm = this.formBuilder.group({ 
      _id: [], 
      code: [tripCode, Validators.required], 
      name: ['', Validators.required], 
      length: ['', Validators.required], 
      start: ['', Validators.required], 
      resort: ['', Validators.required], 
      perPerson: ['', Validators.required], 
      image: ['', Validators.required], 
      description: ['', Validators.required] 
    }); 

    // edit-trip.component.ts
this.tripDataService.getTrip(tripCode).subscribe({
  next: (trip: Trip) => {
    this.trip = trip;
    this.editForm.patchValue(this.trip);
  },
  error: (error: any) => {
    console.log('Error: ' + error);
  }
});
  }

  public onSubmit() { 
    this.submitted = true; 

    if (this.editForm.valid) { 
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({ 
          next: (value: any) => { 
            console.log(value); 
            this.router.navigate(['']); 
          }, 
          error: (error: any) => { 
            console.log('Error: ' + error); 
          } 
        }); 
    }  
  }

  // get the form short name to access the form fields 
  get f() { return this.editForm.controls; }
}
