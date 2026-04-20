import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      grade: ['', Validators.required],
      className: ['', Validators.required],
      enrollDate: ['']
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      // هنا تربط API
    }
  }
}
