import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private navCtrl: NavController) {}

  isEdit = false;

  profile = {
    username: "sysadmin",
    email: "admin@edutrack360.com",
    phone: "",
    memberSince: "2026-02-18"
  };

  originalProfile: any;

  ngOnInit(): void {
    this.originalProfile = { ...this.profile };
  }

  enableEdit(){
    this.isEdit = true;
  }

  // التحقق إذا حدث تعديل
  hasChanges(): boolean {
    return (
      this.profile.username !== this.originalProfile.username ||
      this.profile.email !== this.originalProfile.email ||
      this.profile.phone !== this.originalProfile.phone ||
      this.profile.memberSince !== this.originalProfile.memberSince
    );
  }

  saveProfile(){

    if(!this.hasChanges()){
      console.log("No changes detected");
      return;
    }

    console.log("Saved profile:", this.profile);

    // تحديث النسخة الأصلية
    this.originalProfile = { ...this.profile };

    this.isEdit = false;
  }

  goBack() {
    this.navCtrl.back();
  }

}