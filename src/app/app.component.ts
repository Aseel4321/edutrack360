import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {

      const deviceLang = navigator.language?.split('-')[0] || 'en';
      const supportedLangs = ['en', 'ar'];

      let lang = localStorage.getItem('lang');

      if (!lang) {
        lang = supportedLangs.includes(deviceLang) ? deviceLang : 'en';
        localStorage.setItem('lang', lang);
      }

      this.translate.setDefaultLang('en');
      this.translate.use(lang);

      this.setDirection(lang);

      // تحديث الاتجاه عند تغيير اللغة
      this.translate.onLangChange.subscribe((event) => {
        this.setDirection(event.lang);
      });

    });

  }

  setDirection(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

}