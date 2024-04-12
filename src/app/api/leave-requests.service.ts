import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestsApiService {
  private http = inject(HttpClient);

  public getAllLeaveRequests(): Observable<any> {
    return this.http.get<any>(`${environment.api}/leave-requests`);
  }

  public getLeaveRequestsByEmployee(): Observable<any> {
    return this.http.get<any>(
      `${environment.api}/leave-requests/current-employee`,
    );
  }

  public createLeaveRequest(leaveRequest: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api}/leave-requests`,
      leaveRequest,
    );
  }

  public createLeaveRequestByEmployee(leaveRequest: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api}/leave-requests/employee`,
      leaveRequest,
    );
  }

  public updateLeaveRequest(leaveRequest: any): Observable<any> {
    return this.http.patch<any>(
      `${environment.api}/leave-requests`,
      leaveRequest,
    );
  }

  // public deletePosition(position: any): Observable<any> {
  //   return this.http.delete(`${environment.api}/positions/${position.id}`);
  // }
}
