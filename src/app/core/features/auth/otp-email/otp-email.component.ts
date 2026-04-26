import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput, Platform } from '@ionic/angular';
import { arrowBackOutline, lockClosedOutline,mailOpenOutline } from 'ionicons/icons';
import { faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { HttpErrorResponse } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Keyboard } from '@capacitor/keyboard';
@Component({
  selector: 'app-otp-email',
  templateUrl: './otp-email.component.html',
  styleUrls: ['./otp-email.component.scss'],
})
export class OtpEmailComponent implements AfterViewInit ,OnInit {  backIcon = arrowBackOutline;mailOpenOutline= mailOpenOutline; faLock = faLock;
  lockIcon = lockClosedOutline;
  name: any = "ggg"; 
  disabled = true;
  isLoading = false;
isLoadingotp = false;
  code: string = '';
   isKeyboardOpen: boolean = false;
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
  num: { [key: number]: boolean } = {
    0: false,
    1: false,
    2: false,
    3: false
  };
  initialHeight: number = window.innerHeight;
keyboardOpen: boolean = false;

private lockInProgress = false;
  @ViewChildren(IonInput) inputs!: QueryList<IonInput>;

  constructor(private screenOrientation: ScreenOrientation,private platform: Platform,private router: Router,private alertController: AlertController) {}
  ngOnInit(): void {
        this.lockInProgress = false;

  this.platform.ready().then(() => {
    if (Capacitor.isNativePlatform() && !this.lockInProgress) {
      this.lockInProgress = true;
      setTimeout(() => {
        ScreenOrientation.lock({ orientation: 'portrait' })
          .then(() => console.log('Orientation locked'))
          .catch(err => console.error('Lock failed', err));
      }, 150);
    }

    // مراقبة فتح الكيبورد
    window.addEventListener('resize', () => {
      const currentHeight = window.innerHeight;
      this.keyboardOpen = currentHeight < this.initialHeight - 100;

      // تحديث CSS يدويًا لو أردت
      const img = document.querySelector('.login-image2') as HTMLElement;
     
    });
  }); this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
      this.isKeyboardOpen = true; // السماح بالتمرير
    });

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
      this.isKeyboardOpen = false;
       const activeElement = document.activeElement as HTMLElement;
    if (activeElement && typeof activeElement.blur === 'function') {
      activeElement.blur();
    }
       // منع التمرير عند إغلاق الكيبورد
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputs.first.setFocus();
    }, 300);
  }
goBack() {
  this.router.navigate(['/login']);
}
  onInputChange(event: any, index: number) {
    const input = event.target.value;


    this.num[index] = !!(input && input.trim() !== '');

   
    if (input && index < this.inputs.length - 1) {
      this.inputs.toArray()[index + 1].setFocus();
    }

   
    this.code = this.inputs
      .toArray()
      .map(inputEl => inputEl.value || '')
      .join('');

   
    this.validation();
  }

  validation() {
    const allFilled = this.num[0] && this.num[1] && this.num[2] && this.num[3];
    this.disabled = !allFilled;
    return allFilled ? 'login-button-activee' : 'login-button';
  }

  async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){  const alert = await this.alertController.create({
  
    message: this.name,
    buttons: ['موافق']
  });await alert.present();}else{const alert = await this.alertController.create({
  
    message: this.name,
    buttons: ['ok']
  });await alert.present();}


  
}

}
