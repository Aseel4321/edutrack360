import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { SplashScreenComponent } from '../auth/splash-screen/splash-screen.component';
import { OtpEmailComponent } from '../auth/otp-email/otp-email.component';
import { RestPasswordComponent } from '../auth/rest-password/rest-password.component';
import { AdminComponent } from '../admin/admin/admin.component';
import { SystemAdminComponent } from '../system-admin/system-admin/system-admin.component';
import { MoreComponent } from '../system-admin/more/more.component';
import { SchoolsComponent } from '../system-admin/schools/schools.component';
import { AddSchoolComponent } from '../system-admin/add-school/add-school.component';
import { ProfileComponent } from '../system-admin/profile/profile.component';
import { PrincipalComponent } from '../Principal/principal/principal.component';
import { DashbordComponent } from '../Principal/dashbord/dashbord.component';
import { MessagesComponent } from '../Principal/messages/messages.component';
import { StudentsComponent } from '../Principal/students/students.component';
import { MessageComponent } from '../Principal/message/message.component';
import { AddStudentsComponent } from '../Principal/add-students/add-students.component';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'forgot-password', component:ForgotPasswordComponent },
  { path:'', component:SplashScreenComponent },
  { path:'otp', component:OtpEmailComponent },
  { path:'add-schools', component:AddSchoolComponent },
  { path:'rest-password', component:RestPasswordComponent },
  { path:'profile', component:ProfileComponent },
  { path:'admin', component:AdminComponent },

  // Principal Routes
  { 
    path: 'principal',
    component: PrincipalComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashbordComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'more', component: MoreComponent },
    ]
  },
{ path: 'message', component: MessageComponent },{ path: 'Addstudents', component: AddStudentsComponent },
  // System Admin Routes
  {
    path: 'system-admin',
    component: SystemAdminComponent,
    children: [
      { path: '', redirectTo: 'schools', pathMatch: 'full' }, // ✅ relative path
      { path: 'more', component: MoreComponent },
      { path: 'schools', component: SchoolsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}