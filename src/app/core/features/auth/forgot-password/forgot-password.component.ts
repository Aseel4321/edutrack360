import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { ToastController } from '@ionic/angular';
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
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required]]
    });
  }

  // 🔔 Toast Message
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

    if (this.forgotForm.invalid) {
      this.showToast('Please enter your email');
      return;
    }

    this.isLoading = true;

    const email = this.forgotForm.value.email.trim();

    this.service.forgotPassword(email)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({

        next: (response) => {

          console.log('Reset Email Sent:', response);

          this.showToast(
            'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
            'success'
          );

        },

        error: (error) => {

          console.error('Forgot Password Error:', error);

          this.showToast(
            error.error?.message || 'حدث خطأ، حاول مرة أخرى'
          );

        }

      });
  }
}