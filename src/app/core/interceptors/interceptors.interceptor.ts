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

@Injectable()
export class Interceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private service: ServicesService) {}

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

    // ✅ إضافة التوكين
    if (token) {
      authReq = this.addToken(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        // ✅ معالجة 401 (لكن ليس refresh)
        if (
          error.status === 401 &&
          !req.url.includes('/auth/refresh')
        ) {
          return this.handle401Error(authReq, next);
        }

        return throwError(() => error);
      })
    );
  }

  // ✅ إضافة Authorization
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // ✅ معالجة انتهاء التوكين
  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.isRefreshing) {

      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.service.refreshToken().pipe(

        switchMap((res: any) => {

          this.isRefreshing = false;

          const newToken =
            res?.data?.accessToken ||
            res?.accessToken ||
            res?.token;

          if (!newToken) {
            throw new Error('No access token returned');
          }

          // ✅ حفظ التوكين الجديد
          localStorage.setItem('accessToken', newToken);

          this.refreshTokenSubject.next(newToken);

          // إعادة الطلب
          return next.handle(this.addToken(req, newToken));
        }),

        catchError((err) => {

          this.isRefreshing = false;

          // ❌ logout
          localStorage.clear();

          return throwError(() => err);
        })
      );

    } else {

      // ✅ انتظار refresh الحالي
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