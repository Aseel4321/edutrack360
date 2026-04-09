import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModulesRoutingModule } from './modules-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/* Auth Components */

import { LoginComponent } from '../auth/login/login.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SplashScreenComponent } from '../auth/splash-screen/splash-screen.component';
import { OtpEmailComponent } from '../auth/otp-email/otp-email.component';
import { RestPasswordComponent } from '../auth/rest-password/rest-password.component';
import { ProfileComponent } from '../system-admin/profile/profile.component';

/* Admin */

import { AdminComponent } from '../admin/admin/admin.component';

/* System Admin */

import { SystemAdminComponent } from '../system-admin/system-admin/system-admin.component';
import { MoreComponent } from '../system-admin/more/more.component';
import { SchoolsComponent } from '../system-admin/schools/schools.component';
import { AddSchoolComponent } from '../system-admin/add-school/add-school.component';
import { PrincipalComponent } from '../Principal/principal/principal.component';
import { DashbordComponent } from '../Principal/dashbord/dashbord.component';
import { MessagesComponent } from '../Principal/messages/messages.component';
import { StudentsComponent } from '../Principal/students/students.component';

@NgModule({
  declarations: [DashbordComponent,MessagesComponent,StudentsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SplashScreenComponent,
    OtpEmailComponent,
    RestPasswordComponent,
    ProfileComponent,
    AdminComponent,
    SystemAdminComponent,
    MoreComponent,
    SchoolsComponent,
    AddSchoolComponent,
    PrincipalComponent
  ],

  imports: [
    CommonModule,
    HttpClientModule,

    IonicModule,   // مهم جداً

    FormsModule,
    ReactiveFormsModule,

    TranslateModule,
    FontAwesomeModule,

    ModulesRoutingModule
  ]
})
export class ModulesModule {}