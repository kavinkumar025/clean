import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedInRoutingModule } from './logged-in-routing.module';
import { HomeComponent } from './home/home.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { ApiDataTableComponent } from './api-data-table/api-data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    EmployeeListingComponent,
    ApiDataTableComponent
  ],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class LoggedInModule { }
