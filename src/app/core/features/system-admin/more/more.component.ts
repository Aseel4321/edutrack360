import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
currentLang:any ;
  constructor() { }
goToAddSchool1(){console.log("schools page loaded");
  
}
  ngOnInit(): void {this.currentLang  = localStorage.getItem('lang');;
    if(this.currentLang=='ar'){this.currentLang='العربية'}else{this.currentLang='English'}
  }


toggleLanguage() {

  if (this.currentLang === 'العربية') {
    this.currentLang = 'English';
    localStorage.setItem('lang','en');
    document.documentElement.dir = 'ltr';
  } else {
    this.currentLang = 'العربية';localStorage.setItem('lang','ar');
    document.documentElement.dir = 'rtl';
  }

}
}
