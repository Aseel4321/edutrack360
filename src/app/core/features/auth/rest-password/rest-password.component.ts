import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {

    const pass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (!pass || !confirm) return null;

    return pass === confirm ? null : { mismatch: true };
  }

  submit() {

    if (this.resetForm.invalid) return;

    this.isLoading = true;

    setTimeout(() => {

      this.isLoading = false;

      console.log('Password Reset Done');

      this.router.navigate(['/login']);

    }, 1500);
  }
}