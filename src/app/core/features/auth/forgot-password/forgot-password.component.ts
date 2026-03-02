import { Component, OnInit } from '@angular/core';
import { 
arrowBackOutline, mailOpenOutline,mailOutline 
} from 'ionicons/icons';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
arrowBackOutline = arrowBackOutline; mailOpenOutline= mailOpenOutline;mailOutline=mailOutline;
  constructor() { }

  ngOnInit(): void {
  }

}
