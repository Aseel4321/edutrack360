import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {

  //schools: any[] = [];

  constructor(
    private router: Router,
    private service: ServicesService
  ) {}

  searchTerm: string = '';
 

schools = [
    { name: 'Oxford School', code: 'OXF123' },
    { name: 'Al Amal School', code: 'AML456' },
    { name: 'Future Academy', code: 'FTR789' },  
    { name: 'Future Academy', code: 'FTR789' },  { name: 'Future Academy', code: 'FTR789' }
  ];


  // 🔥 هذا هو المهم (كان ناقصك)
  filteredSchools: any[] = [];



  filterSchools() {
    const term = this.searchTerm.toLowerCase();

    this.filteredSchools = this.schools.filter(school =>
      school.name.toLowerCase().includes(term) ||
      school.code.toLowerCase().includes(term)
    );
  }
  ngOnInit(): void {
this.loadSchools();  this.filteredSchools = [...this.schools];
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