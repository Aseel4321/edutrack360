import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;
  isLoading = false;

  constructor(
    private service: ServicesService,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required]]
    });
  }

  async showMessage(header: string, message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['X']
    });

    await alert.present();
  }

  submit() {
    this.isLoading = true;

    const email = this.forgotForm.value.email.trim();

    this.service.forgotPassword(email)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response) => {
          console.log('Reset Email Sent:', response);
          this.showMessage(
            'تم الإرسال',
            'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
          );
        },
        error: (error) => {
          console.error('Forgot Password Error:', error);
          this.showMessage(
            'خطأ',
            error.error?.message || 'حدث خطأ، حاول مرة أخرى'
          );
        }
      });
  }
}