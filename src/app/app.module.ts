import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './auth/form/login/login.component';
import {RegComponent} from './auth/form/reg/reg.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AuthInterceptor, httpInterceptorProviders} from './auth/interceptor/auth-interceptor';
import {AppRoutingModule} from './routing/app-routing/app-routing.module';
import { MainChatComponent } from './main-chat/main-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegComponent,
    MainChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
