import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AttendancesApiService {
  private http = inject(HttpClient);

  public getAllAttendances(): Observable<any> {
    return this.http.get<any>(`${environment.api}/attendances`);
  }

  public getAllCurrentEmployeeAttendances(): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/attendances/current-employee`,
    );
  }

  public createAttendance(attendance: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/attendances`, attendance);
  }

  public createAttendanceByEmployee(attendance: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api}/attendances/employee`,
      attendance,
    );
  }

  //
  // public updateAttendance(attendance: any): Observable<any> {
  //   return this.http.patch<any>(`${environment.api}/attendance`, attendance);
  // }
  //
  // public deletePosition(position: any): Observable<any> {
  //   return this.http.delete(`${environment.api}/positions/${position.id}`);
  // }
}
