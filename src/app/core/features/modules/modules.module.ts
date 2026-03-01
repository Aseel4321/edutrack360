import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { LoginComponent } from '../auth/login/login.component';
import { IonicModule } from '@ionic/angular';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';


@NgModule({
  declarations: [LoginComponent,ForgotPasswordComponent],
  imports: [IonicModule,
    CommonModule,
    ModulesRoutingModule
  ]
})
export class ModulesModule { }
