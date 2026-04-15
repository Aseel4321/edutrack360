import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  schoolForm!: FormGroup;
  isLoading = false; 
  constructor(
    private toastController: ToastController,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private http: HttpClient,
    private Service: ServicesService
  ) {}

  goBack() {
    this.navCtrl.back();
  }

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

    if (this.schoolForm.invalid) return;

    this.isLoading = true; 

    const form = this.schoolForm.value;

    const body = {
      schoolName: form.schoolName,
      subdomain: form.subdomain,
      logoUrl: "",
      primaryColor: "#D77e89",
      secondaryColor: "#3F721A",
      address: form.address,
      phone: form.phone,
      email: form.schoolEmail,
      subscriptionPlan: "TRIAL",
      principalUsername: form.username,
      principalEmail: form.principalEmail,
      principalPassword: form.password,
      principalFirstName: form.firstName,
      principalLastName: form.lastName,
      principalPhone: form.phone
    };

    this.Service.createSchool(body).subscribe({
      next: async (res) => {

        this.isLoading = false;

        await this.showToast("School created successfully", "success");

        this.schoolForm.reset();
console.log('res');console.log(res);
      },
      error: async (err) => {

        this.isLoading = false;

        let message = "Error creating school";

        if (err.error?.data?.phone) {
          message = err.error.data.phone;
        }

        await this.showToast(message, "danger");

      }
    });
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });

    await toast.present();
  }
}