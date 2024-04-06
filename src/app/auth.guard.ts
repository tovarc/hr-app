import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from './api/auth.service';
import { inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authApiService = inject(AuthApiService);
  const router = inject(Router);

  return authApiService.checkAuthentication().pipe(
    switchMap((authorized) => {
      if (authorized) {
        return of(true);
      }
      router.navigateByUrl('/login');
      return of(false);
    }),
  );
};
