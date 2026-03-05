import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { 
  personOutline, 
  lockClosedOutline, 
  businessOutline,
  schoolOutline,
  languageOutline 
} from 'ionicons/icons';
import { ServicesService } from '../services/services.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  personOutline = personOutline;
  lockClosedOutline = lockClosedOutline;
  businessOutline = businessOutline;
  schoolOutline = schoolOutline;
  languageOutline = languageOutline;

  loginForm!: FormGroup;
  showPassword = false;
private currentAlert: HTMLIonAlertElement | null = null;
  private apiUrl = 'https://margherita-circadian-minta.ngrok-free.dev/api/auth/login';
currentLang:any ;
  constructor(private translate: TranslateService,
    private fb: FormBuilder,private alertController: AlertController,
    private http: HttpClient ,private Service: ServicesService
  ) {}
isLoading = false;
  ngOnInit(): void {this.currentLang  = localStorage.getItem('lang');;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      schoolCode: ['']
    });
  }
async showError(message: string) {

  // ✅ إذا في Alert مفتوح نقفله أولاً

  const alert = await this.alertController.create({
   
    message: message,
    backdropDismiss: false,
    buttons: [
      {
        text: 'X',
        role: 'confirm'
      }
    ]
  });

  this.currentAlert = alert;

  await alert.present();

}
 submit() {


    this.isLoading = true;

    const payload = {
      usernameOrEmail: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password.trim(),
      schoolSubdomain: this.loginForm.value.schoolCode?.trim()
    };

    this.Service.login(payload)
       .pipe(
      finalize(() => {
        this.isLoading = false; // 🔥 إيقاف التحميل دائماً
      })
    )
      .subscribe({
        next: (res) => {
          console.log('Login Success:', res);

          // ✅ الانتقال بعد النجاح
       
        },
        error: (err) => {
          // ✅ عرض رسالة Ionic
          this.showError(err.error?.message || 'فشل تسجيل الدخول');
        }
      });
  }  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLang);

    document.documentElement.dir =
      this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}