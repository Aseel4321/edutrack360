import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
 private baseUrl = 'https://margherita-circadian-minta.ngrok-free.dev/api/auth';
  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) {}
  login(data: {
    usernameOrEmail: string;
    password: string;
    schoolSubdomain?: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      data,
      { headers: this.headers }
    );
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/forgot-password`,
      { email },
      { headers: this.headers }
    );}
  }

