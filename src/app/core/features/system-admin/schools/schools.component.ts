import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
goToAddSchool1(){console.log("schools page loaded");
  
}
  schools = [
    {
      name: 'admin.edutrack360.com',
      status: 'Active'
    },
    {
      name: 'springfield.edutrack360.com',
      email: 'info@springfield-elementary.edu',
      status: 'Active'
    }
  ];
  ngOnInit(): void {console.log("schools page loaded");
  }
constructor(private router: Router) {}
  
goToAddSchool(){
  this.router.navigate(['/add-schools']);
}
}
  