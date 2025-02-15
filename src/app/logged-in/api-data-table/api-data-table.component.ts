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
  // public selectedImage: any;
  public isAdmin: boolean = false;
  public base64Image: string | null = null;
  public imageError: string | null = null;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public dataService: DataStoreService,
    public firestore: AngularFirestore
  ) {
    const storedEmail = localStorage.getItem('email') || ''
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z]+$'),],],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'), Validators.maxLength(10),],],
      email: [storedEmail, [Validators.required, Validators.email, Validators.maxLength(100),],],
      address: ['', [Validators.required, Validators.maxLength(200)],],
      issues: ['', Validators.required],
      longitude: [null],
      latitude: [null],
      createdAt: [new Date().toISOString(), [Validators.required]],
      status: ['New'],
      imageBase64: [''],
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin' || user.role === 'super admin';
    this.getCurrentLocation();
  }

  get f() {
    return this.addEmployeeForm.controls;
  }

  public onSubmit() {
    if (this.addEmployeeForm.valid) {
      const formData = this.addEmployeeForm.value;
      this.firestore
        .collection('complaint')
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

  public getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
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

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Only image files are allowed!';
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        this.imageError = 'Image size should not exceed 2MB!';
        return;
      }
      this.imageError = null;
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.addEmployeeForm.patchValue({ imageBase64: this.base64Image });
      };
      reader.readAsDataURL(file);
    }
  }

}