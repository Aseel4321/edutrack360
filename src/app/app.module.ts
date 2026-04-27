import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ModulesModule } from './core/features/modules/modules.module';
import { Interceptor } from './core/interceptors/interceptors.interceptor';
import { PrincipalComponent } from './core/features/Principal/principal/principal.component';
import { DashbordComponent } from './core/features/Principal/dashbord/dashbord.component';
import { StudentsComponent } from './core/features/Principal/students/students.component';
import { MessagesComponent } from './core/features/Principal/messages/messages.component';
import { MessageComponent } from './core/features/Principal/message/message.component';
import { AddStudentsComponent } from './core/features/Principal/add-students/add-students.component';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,

   
  
    

 
  ],

  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ModulesModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]

})
export class AppModule {}