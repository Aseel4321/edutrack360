import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModulesRoutingModule } from './modules-routing.module';
import { LoginComponent } from '../auth/login/login.component';
import { IonicModule } from '@ionic/angular';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SplashScreenComponent } from '../auth/splash-screen/splash-screen.component';
import { OtpEmailComponent } from '../auth/otp-email/otp-email.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [LoginComponent,ForgotPasswordComponent,SplashScreenComponent,OtpEmailComponent],
  imports: [IonicModule,HttpClientModule,TranslateModule,
    CommonModule,
    ModulesRoutingModule, FontAwesomeModule, ReactiveFormsModule
  ]
})
export class ModulesModule { }
