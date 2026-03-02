import { Component, OnInit } from '@angular/core';
import { 
  personOutline, 
  lockClosedOutline, 
  businessOutline,schoolOutline,languageOutline 
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
  constructor() {}

  ngOnInit(): void {
    
  }

}
