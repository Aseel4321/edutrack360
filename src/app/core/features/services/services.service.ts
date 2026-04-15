import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl = 'https://margherita-circadian-minta.ngrok-free.dev/api';

  constructor(private http: HttpClient) {}

  // ✅ LOGIN
  login(data: {
    usernameOrEmail: string;
    password: string;
    schoolSubdomain?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // ✅ REFRESH TOKEN
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post(`${this.baseUrl}/auth/refresh`, {
      refreshToken: refreshToken
    });
  }

  // ✅ FORGOT PASSWORD
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, { email });
  }

  // ✅ CREATE SCHOOL
  createSchool(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/schools`, data);
  }

  // ✅ GET SCHOOLS
  getSchools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lookups/schools`, {
      params: {
        page: 0,
        size: 2,
        status: 'ACTIVE'
      }
    });
  }

  // ✅ GET MESSAGES
  getMessages(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages`, {
      params: { type }
    });
  }

  // ✅ GET SCHOOL BY ID
  getSchoolById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/schools/${id}`);
  }

  // ✅ CHANGE PASSWORD
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/change-password`, {
      currentPassword,
      newPassword
    });
  }

  // ✅ GET USERS
  getUsers(
    role: string = '',
    status: string = 'ACTIVE',
    search: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<any> {

    const params: any = {
      status,
      page,
      size
    };

    if (role) params.role = role;
    if (search) params.search = search;

    return this.http.get(`${this.baseUrl}/users`, { params });
  }

  // ✅ CREATE USER
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }
}