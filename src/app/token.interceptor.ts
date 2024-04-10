import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  const isLogin = req.url.includes('auth/login');

  if (isLogin) next(req);

  if (!isLogin && token) {
    const reqWithBearerToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(reqWithBearerToken);
  } else {
    return next(req);
  }
};
