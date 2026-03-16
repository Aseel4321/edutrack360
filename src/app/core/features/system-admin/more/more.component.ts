import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  currentLang: string = '';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {

    const lang = localStorage.getItem('lang') || 'en';

    this.translate.use(lang);

    this.setDirection(lang);

    this.currentLang = lang === 'ar' ? 'العربية' : 'English';
  }

  toggleLanguage() {

    const lang = this.translate.currentLang === 'en' ? 'ar' : 'en';

    this.translate.use(lang);

    localStorage.setItem('lang', lang);

    this.setDirection(lang);

    this.currentLang = lang === 'ar' ? 'العربية' : 'English';
  }

  setDirection(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

}
