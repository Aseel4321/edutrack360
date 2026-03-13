import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CommonModule } from '@angular/common';
import { ModulesModule } from './core/features/modules/modules.module';
import { ForgotPasswordComponent } from './core/features/auth/forgot-password/forgot-password.component';
import { SystemAdminComponent } from './core/features/system-admin/system-admin/system-admin.component';
import { SchoolsComponent } from './core/features/system-admin/schools/schools.component';
import { AddSchoolComponent } from './core/features/system-admin/add-school/add-school.component';






export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [ ModulesModule,
  CommonModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule , HttpClientModule, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }), ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
   