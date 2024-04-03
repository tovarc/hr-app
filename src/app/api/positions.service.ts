import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PositionsApiService {
  private http = inject(HttpClient);

  public getAllPositions(): Observable<any> {
    return this.http.get<any>(`${environment.api}/positions`);
  }

  public createPosition(position: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/positions`, position);
  }

  public updatePosition(position: any): Observable<any> {
    return this.http.patch<any>(`${environment.api}/positions`, position);
  }

  public deletePosition(position: any): Observable<any> {
    return this.http.delete(`${environment.api}/positions/${position.id}`);
  }
}
