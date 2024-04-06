import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  public checkAuthentication(): Observable<boolean> {
    return this.http.get<any>(`${environment.api}/auth/verify`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        console.error('Error checking authorization:', error);
        return of(false);
      }),
    );
  }

  public login(user: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, user);
  }

  public register(user: any): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/register`, user);
  }
}
