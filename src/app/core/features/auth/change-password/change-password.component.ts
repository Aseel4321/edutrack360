import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  resetForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,private navCtrl: NavController) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.resetForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return newPassword === confirmPassword
      ? null
      : { mismatch: true };
  }
  goBack() {
    this.navCtrl.back();
  }
  submit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const data = this.resetForm.value;

    console.log('Change Password Data:', data);

    // هنا تربط API تبعك
    setTimeout(() => {
      this.isLoading = false;
      console.log('Password changed successfully');
    }, 1500);
  }
}