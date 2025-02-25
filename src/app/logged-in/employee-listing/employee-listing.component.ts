import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoreService } from 'src/app/data-store.service';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.scss']
})
export class EmployeeListingComponent {

  public data: any[] = [];
  public filteredData: any[] = [];
  public paginatedData: any[] = [];
  public currentPage = 1;
  public pageSize = 10;
  public totalPages = 0;
  public totalRecords = 0;
  public sortColumn: string | null = null;
  public sortDirection: 'asc' | 'desc' | null = null;
  public searchForm: FormGroup;
  public db = getFirestore();
  public isAdmin: boolean = false;
  public statusOptions: string[] = ['In Progress', 'In Review', 'Blocked', "Closed (Won't Fix)", 'Closed (Fixed)'];

  constructor(
    public dataService: DataStoreService,
    public fb: FormBuilder,
    public router: Router
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin' || user.role === 'super admin';
    const storedEmail = localStorage.getItem('email') || ''
    this.searchForm = this.fb.group({
      name: [''],
      contact: [''],
      email: [''],
      address: ['']
    });
    if (!this.isAdmin) this.searchForm.controls['email'].setValue(storedEmail);
  }

  ngOnInit() {
    this.fetchDataFromFirestore();
  }

  async fetchDataFromFirestore() {
    const employeesRef = collection(this.db, 'complaint');
    const q = query(
      employeesRef,
      ...(this.searchForm.value.name ? [where('name', '==', this.searchForm.value.name)] : []),
      ...(this.searchForm.value.contact ? [where('contact', '==', this.searchForm.value.contact)] : []),
      ...(this.searchForm.value.email ? [where('email', '==', this.searchForm.value.email)] : []),
      ...(this.searchForm.value.address ? [where('address', '==', this.searchForm.value.address)] : [])
    );
    const querySnapshot = await getDocs(q);
    this.data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    this.filteredData = [...this.data];
    this.updatePagination();
  }

  // Handle sorting
  public sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filteredData.sort((a, b) => {
      const aValue = column === 'date' ? new Date(a[column]) : a[column];
      const bValue = column === 'date' ? new Date(b[column]) : b[column];
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.updatePagination();
  }

  public updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.filteredData.slice(start, end);
    this.totalRecords = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  // Handle page change
  public onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Handle search action
  public onSearch() {
    this.fetchDataFromFirestore();
  }

  // Handle search reset
  public clearSearch() {
    this.searchForm.reset();
    this.fetchDataFromFirestore();  // Reset search
  }

  public add() {
    this.router.navigate(['/api-data-table']);
  }

  async updateStatus(employee: any) {
    debugger
    try {
      const employeeRef = doc(this.db, 'complaint', employee.id);
      await updateDoc(employeeRef, { status: employee.status });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Status updated successfully!`,
        confirmButtonText: 'OK',
      }).then(() => {

      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

}