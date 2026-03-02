import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SplashScreenComponent } from '../auth/splash-screen/splash-screen.component';
import { OtpEmailComponent } from '../auth/otp-email/otp-email.component';

const routes: Routes = [{path:'login',component:LoginComponent},{path:'forgot-password',component:ForgotPasswordComponent},{path:'',component:SplashScreenComponent},{path:'otp',component:OtpEmailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
