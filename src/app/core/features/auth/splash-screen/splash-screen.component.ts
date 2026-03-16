import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
constructor(private router: Router) {}
ngOnInit(): void {

  const loginData = localStorage.getItem('login');

  if (!loginData) {

    console.log('لا يوجد login');
    this.router.navigate(['/login']);

  } else {

    try {

      const userData = JSON.parse(loginData);
      console.log('البيانات:', userData);

      setTimeout(() => {

        if (userData?.user?.role === 'SYSTEM_ADMIN') {
          this.router.navigate(['/system-admin/schools']);
        } else {
          this.router.navigate(['/login']);
        }

      }, 2000);

    } catch (error) {

      console.log('البيانات المخزنة غير صحيحة');
      localStorage.removeItem('login');
      this.router.navigate(['/login']);

    }

  }

}
}
