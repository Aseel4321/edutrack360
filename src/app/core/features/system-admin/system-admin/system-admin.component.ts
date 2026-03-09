import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.css']
})
export class SystemAdminComponent implements OnInit {



  activeTab = 'schools';

  constructor(private router: Router) {

    

  }setActiveTab(tab: string, route: string) {
  this.activeTab = tab;
  this.router.navigate([route]);
}
  ngOnInit(): void {
  }

}
