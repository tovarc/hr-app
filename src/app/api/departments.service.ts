import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsApiService {
  private http = inject(HttpClient);

  public getAllDepartments(): Observable<any> {
    return this.http.get<any>(`${environment.api}/departments`);
  }

  public createDepartment(department: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/departments`, department);
  }

  public updateDepartment(department: any): Observable<any> {
    return this.http.patch<any>(`${environment.api}/departments`, department);
  }

  public deleteDepartment(department: any): Observable<any> {
    return this.http.delete(`${environment.api}/departments/${department.id}`);
  }
}
