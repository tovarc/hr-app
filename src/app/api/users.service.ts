import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  private http = inject(HttpClient);

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.api}/users`);
  }

  public updateUser(user: any): Observable<any> {
    return this.http.patch<any>(`${environment.api}/users`, user);
  }
}
