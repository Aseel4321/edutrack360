import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-system-admin',
  templateUrl: './system-admin.component.html',
  styleUrls: ['./system-admin.component.css']
})
export class SystemAdminComponent implements OnInit, OnDestroy {

  activeTab = 'schools';

  keyboardOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {

    Keyboard.addListener('keyboardWillShow', () => {
      this.keyboardOpen = true;
    });

    Keyboard.addListener('keyboardWillHide', () => {
      this.keyboardOpen = false;
    });

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        if (event.url.includes('schools')) {
          this.activeTab = 'schools';
        }

        if (event.url.includes('more')) {
          this.activeTab = 'more';
        }

      }

    });

  }

  setActiveTab(tab: string, route: string) {

    this.activeTab = tab;

    this.router.navigateByUrl(route);

  }

  ngOnDestroy(): void {
    Keyboard.removeAllListeners();
  }

}