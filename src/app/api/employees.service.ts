import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/employee.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  private http = inject(HttpClient);

  public getAllEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(`${environment.api}/employees`);
  }

  public createEmployee(employee: any): Observable<IEmployee> {
    return this.http.post<IEmployee>(`${environment.api}/employees`, employee);
  }

  public updateEmployee(employee: any): Observable<IEmployee> {
    return this.http.patch<IEmployee>(`${environment.api}/employees`, employee);
  }

  public deleteEmployee(employee: any): Observable<any> {
    return this.http.delete(`${environment.api}/employees/${employee.id}`);
  }
}
