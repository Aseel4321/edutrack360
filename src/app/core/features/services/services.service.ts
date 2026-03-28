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
      `https://margherita-circadian-minta.ngrok-free.dev/api/auth/login`,
      data,
      { headers: this.headers }
    );
  }refreshToken() {

  const refreshToken = localStorage.getItem('refreshToken');

  return this.http.post('https://margherita-circadian-minta.ngrok-free.dev/api/auth/refresh', {
    refreshToken: refreshToken
  });

}
  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/forgot-password`,
      { email },
      { headers: this.headers }
    );}
    createSchool(data: any) {

  const loginData = localStorage.getItem('login');

  let token = '';

  if (loginData) {
    const userData = JSON.parse(loginData);
    token = userData.accessToken;
  }
console.log(token)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  
  });

  return this.http.post(this.api, data, { headers });

} getSchools(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    
    });

    const url = 'https://margherita-circadian-minta.ngrok-free.dev/api/lookups/schools';
    const params = {
      page: 0,
      size: 2,
      status: 'ACTIVE'
    };

    return this.http.get(url, { headers, params });
  }
getSchoolById(id: number) {
 

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  };

  return this.http.get(
    `https://margherita-circadian-minta.ngrok-free.dev/api/admin/schools/${id}`, // استخدم /api مع proxy
    { headers }
  );
}changePassword(currentPassword: string, newPassword: string) {
 

  const headers = { 
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
   
  };

  const body = {
    currentPassword,
    newPassword
  };

  return this.http.post('https://margherita-circadian-minta.ngrok-free.dev/api/auth/change-password', body, { headers });
}getUsers(
  role: string = '',
  status: string = 'ACTIVE',
  search: string = '',
  page: number = 0,
  size: number = 10
) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // تحويل البارام إلى query string
  const params = new URLSearchParams();
  if (role) params.append('role', role);
  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('size', size.toString());

  return this.http.get(`/api/users?${params.toString()}`, { headers });
}createUser(user: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  };

  return this.http.post('https://margherita-circadian-minta.ngrok-free.dev/api/users', user, { headers });
}
  }
