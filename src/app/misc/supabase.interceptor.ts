import {
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, exhaustMap, take } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
class SupabaseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userProfileSubject.pipe(
      take(1),
      exhaustMap((user) => {
        const url = environment.SUPA_BASE_URL + req.url;
        const apiKey =
          req.url === '/users' ? environment.SUPA_ANON_KEY : user?.token || '';
        const setHeaders = {
          apiKey,
        };

        return next.handle(req.clone({ url, setHeaders }));
      })
    );
  }
}

const SupabaseInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SupabaseInterceptor,
  multi: true,
};

export { SupabaseInterceptor, SupabaseInterceptorProvider };
