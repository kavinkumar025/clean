import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListingComponent } from './employee-listing/employee-listing.component';
import { ApiDataTableComponent } from './api-data-table/api-data-table.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'complaint-listing', component: EmployeeListingComponent, canActivate: [AuthGuard] },
      { path: 'add-complaint-table', component: ApiDataTableComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedInRoutingModule { }
