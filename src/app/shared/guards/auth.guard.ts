import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AuthApiService } from '../../api/auth.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authApiService = inject(AuthApiService);
  const userService = inject(UserService);
  const router = inject(Router);

  return authApiService.checkAuthentication().pipe(
    switchMap((authorizedUser: any) => {
      if (authorizedUser) {
        userService.setLoggedUser(authorizedUser);
        return of(true);
      }
      router.navigateByUrl('/login');
      return of(false);
    }),
  );
};
