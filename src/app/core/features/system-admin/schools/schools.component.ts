import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {

  schools: any[] = [];

  constructor(
    private router: Router,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
this.loadSchools();
  }

  loadSchools() {
   this.service.getSchools().subscribe({
  next: (res) => console.log('المدارس:', res),
  error: (err) => console.error('خطأ:', err)
});
  }

  goToAddSchool() {
    this.router.navigate(['/add-schools']);
  }

}