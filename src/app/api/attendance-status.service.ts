import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AttendanceStatusApiService {
  private http = inject(HttpClient);

  public getAllAttendanceStatus(): Observable<any> {
    return this.http.get<any>(`${environment.api}/attendance-status`);
  }

  public createAttendanceStatus(attendanceStatus: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api}/attendance-status`,
      attendanceStatus,
    );
  }

  public updateAttendanceStatus(attendanceStatus: any): Observable<any> {
    return this.http.patch<any>(
      `${environment.api}/attendance-status`,
      attendanceStatus,
    );
  }

  // public deletePosition(position: any): Observable<any> {
  //   return this.http.delete(`${environment.api}/positions/${position.id}`);
  // }
}
