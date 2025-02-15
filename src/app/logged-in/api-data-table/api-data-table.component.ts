import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoreService } from 'src/app/data-store.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-api-data-table',
  templateUrl: './api-data-table.component.html',
  styleUrls: ['./api-data-table.component.scss']
})

export class ApiDataTableComponent {

  public addEmployeeForm: FormGroup;
  public currentLocation: { latitude: number, longitude: number } = { latitude: 0, longitude: 0 };
  public selectedImage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataStoreService,
    private firestore: AngularFirestore
  ) {
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$'),],],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10),],],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100),],],
      address: ['', [Validators.required, Validators.maxLength(200)],],
      issues: ['', Validators.required], // New 'issues' field
      longitude: [null], // New 'image' field
      latitude: [null], // New 'image' field

    });
    this.getCurrentLocation();

  }

  get f() {
    return this.addEmployeeForm.controls;
  }

  // public onSubmit() {
  //   if (this.addEmployeeForm.invalid) {
  //     return;
  //   }
  //   const employeeDetails = this.addEmployeeForm.value;
  //   this.dataService.addEmployee(employeeDetails);
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Success',
  //     text: `The employee "${employeeDetails.name}" has been added successfully.`,
  //     confirmButtonText: 'OK',
  //   }).then(() => {
  //     this.router.navigate(['/employee-listing']);
  //   });
  // }

  onSubmit() {
    if (this.addEmployeeForm.valid) {
      const formData = this.addEmployeeForm.value;

      // Upload to Firestore
      this.firestore
        .collection('complaint') // Add your collection name
        .add(formData)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `The complaint "${formData.name}" has been added successfully.`,
            confirmButtonText: 'OK',
          }).then(() => {
            this.addEmployeeForm.reset();
          });
        })
        .catch((error) => {
          console.error('Error adding employee: ', error);
        });
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude);
          console.log(longitude);


          // Set the latitude and longitude in the form
          this.addEmployeeForm.patchValue({
            latitude: latitude,
            longitude: longitude,
          });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}
