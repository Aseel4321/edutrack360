import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {api = 'https://margherita-circadian-minta.ngrok-free.dev/api/admin/schools';
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
    createSchool(data: any) {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
     'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMCIsInNjaG9vbElkIjoxLCJyb2xlIjoiU1lTVEVNX0FETUlOIiwiaWF0IjoxNzczNjE2OTQyLCJleHAiOjE3NzM2MTc4NDJ9.UxC_5QHLXNi8MR9wmXYqTjRMDYbHPjqXLjQf2tz_UBNhTTjPI7O1xlaoO2CMQALGbJ0oQOcnY0Ahmqp9ezaeNw'
  });

  return this.http.post(this.api, data, { headers });

}
  }
