import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService {
  private http = inject(HttpClient);

  public getAllRoles(): Observable<any> {
    return this.http.get<any>(`${environment.api}/roles`);
  }
}
