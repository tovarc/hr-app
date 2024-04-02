import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  private http = inject(HttpClient);

  public getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:8000/api/v1/employees');
  }

  public createEmployee(employee: any): Observable<IEmployee> {
    return this.http.post<IEmployee>(
      'http://localhost:8000/api/v1/employees',
      employee,
    );
  }

  public updateEmployee(employee: any): Observable<IEmployee> {
    return this.http.patch<IEmployee>(
      'http://localhost:8000/api/v1/employees',
      employee,
    );
  }

  public deleteEmployee(employee: any): Observable<any> {
    return this.http.delete(
      `http://localhost:8000/api/v1/employees/${employee.id}`,
    );
  }
}
