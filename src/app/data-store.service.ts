import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private apiUrl = 'https://testapp.cleanEnvironstechnology.com/interview/test/v1/product/users?count=200000';
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  private addedEmployees: any[] = [];

  constructor(private http: HttpClient) { }

  

  fetchData(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        const filteredData = response.map((item) => ({
          name: item.name,
          contact: item.id,
          email: item.name,
          address: item.name,
          date: item.date,
        }));
        const mergedData = [...filteredData, ...this.addedEmployees];
        this.dataSubject.next(mergedData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getData(): Observable<any[]> {
    return this.data$;
  }

  addEmployee(employee: any): void {
    this.addedEmployees.push(employee);
    const currentData = this.dataSubject.getValue();
    this.dataSubject.next([...currentData, employee]);
  }
}