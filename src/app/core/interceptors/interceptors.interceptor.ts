import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { ServicesService } from '../features/services/services.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private service: ServicesService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // ✅ استثناء login و refresh
    if (
      req.url.includes('/auth/login') ||
      req.url.includes('/auth/refresh')
    ) {
      return next.handle(req);
    }

    const token = localStorage.getItem('accessToken');

    let authReq = req;

    if (token) {
      authReq = this.addToken(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isRefreshing) {

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.service.refreshToken().pipe(

        switchMap((res: any) => {

          this.isRefreshing = false;

          console.log('REFRESH RESPONSE:', res);

          // ✅ الحل الصحيح حسب API
          const data = res.data;

          if (!data?.accessToken) {
            throw new Error('Invalid refresh response');
          }

          // ✅ تخزين التوكينات
          localStorage.setItem('accessToken', data.accessToken);

          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken);
          }

          this.refreshTokenSubject.next(data.accessToken);

          return next.handle(this.addToken(req, data.accessToken));
        }),

        catchError((err) => {

          this.isRefreshing = false;

          console.log('REFRESH ERROR:', err);

          // ✅ logout فقط إذا 401
          if (err.status === 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }

          return throwError(() => err);
        })
      );

    } else {

      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token =>
          next.handle(this.addToken(req, token!))
        )
      );
    }
  }
}