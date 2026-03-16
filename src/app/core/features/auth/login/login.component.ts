import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  personOutline, 
  lockClosedOutline, 
  businessOutline,
  schoolOutline,
  languageOutline 
} from 'ionicons/icons';
import { ServicesService } from '../../services/services.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  currentLang: any;
  isLoading = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
    private Service: ServicesService
  ) {}

  ngOnInit(): void {

    this.currentLang = localStorage.getItem('lang');

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      schoolCode: ['']
    });
  }

  // 🔔 Toast رسالة
  async showToast(message: string, color: string = 'danger') {

    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
      buttons: [
        {
          text: 'X',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  submit() {

    if (this.loginForm.invalid) {
      this.showToast('Please enter username and password');
      return;
    }

    this.isLoading = true;

    const payload = {
      usernameOrEmail: this.loginForm.value.username.trim(),
      password: this.loginForm.value.password.trim(),
      schoolSubdomain: this.loginForm.value.schoolCode?.trim()
    };

    this.Service.login(payload)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (res) => {

          console.log('Login Success:', res);

          if (res.data.user.role == "SYSTEM_ADMIN") {
            this.router.navigate(['/system-admin/schools']);
          }

          this.showToast('Login successful', 'success');
        },

        error: (err) => {

          console.log(err);

          this.showToast(
            err.error?.message || 'Login failed'
          );
        }
      });
  }

  toggleLanguage() {

    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';

    this.translate.use(this.currentLang);

    localStorage.setItem('lang', this.currentLang);

    document.documentElement.dir =
      this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}