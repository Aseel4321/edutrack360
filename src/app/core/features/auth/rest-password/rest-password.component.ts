import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // تحقق مباشر أثناء الكتابة
    this.resetForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });

  }

  checkPasswords() {

    const password = this.resetForm.get('newPassword')?.value;
    const confirm = this.resetForm.get('confirmPassword')?.value;

    if (!confirm) {
      this.resetForm.get('confirmPassword')?.setErrors(null);
      return;
    }

    if (password !== confirm) {
      this.resetForm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      this.resetForm.get('confirmPassword')?.setErrors(null);
    }

  }

  submit() {

    if (this.resetForm.invalid) return;

    this.isLoading = true;

    const data = {
      newPassword: this.resetForm.value.newPassword
    };

    setTimeout(() => {

      this.isLoading = false;

      console.log('Password Updated', data);

      this.router.navigate(['/login']);

    },1500);

  }

}