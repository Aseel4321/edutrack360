import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
isEdit = false;

profile = {
username: "sysadmin",
email: "admin@edutrack360.com",
phone: "",
memberSince: "Feb 18 2026"
};

enableEdit(){
this.isEdit = true;
}

saveProfile(){

console.log(this.profile);

this.isEdit = false;

}
  ngOnInit(): void {
  }

}
