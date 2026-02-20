import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {  ngOnInit(): void {}

 initializeApp() {
  this.platform.ready().then(() => {

    const deviceLang = navigator.language?.split('-')[0] || 'en';
    const supportedLangs = ['en', 'ar'];

    let lang = localStorage.getItem('lang');

    if (!lang) {
      lang = supportedLangs.includes(deviceLang) ? deviceLang : 'en';
      localStorage.setItem('lang', lang);
    }

    this.translate.use(lang);

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  });
}

   constructor(
    private platform: Platform,
    private translate: TranslateService
  ) { 
    this.initializeApp();
  }
}
