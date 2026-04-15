import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messageForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      recipients: [null, Validators.required],
      subject: ['', Validators.required],
      type: ['general'],
      priority: ['normal'],
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.messageForm.invalid) {
      this.messageForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    console.log(this.messageForm.value);

    // محاكاة API
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}