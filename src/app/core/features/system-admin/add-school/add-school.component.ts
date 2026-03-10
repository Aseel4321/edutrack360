import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  schoolForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.schoolForm = this.fb.group({
      schoolName: ['', Validators.required],
      subdomain: ['', Validators.required],
      schoolEmail: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      principalEmail: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  createSchool() {
    console.log(this.schoolForm.value);
  }

}