import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  isLoading = true;
  hasError = false;
  userName = '';



  constructor(
    
    public translate: TranslateService,
    private router: Router,
  ) {}

  ngOnInit(): void {

  }



  navigateTo(path: string): void {
    this.router.navigate(['/tabs/' + path]);
  }



}
