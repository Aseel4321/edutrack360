import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  personOutline, 
  lockClosedOutline, 
  businessOutline,
  schoolOutline,
  languageOutline 
} from 'ionicons/icons';

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
  showPassword = false; // ✅ هذا كان ناقص

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      schoolCode: ['']
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm.value);
  }
}