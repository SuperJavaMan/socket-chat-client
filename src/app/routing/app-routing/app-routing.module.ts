import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../../app.component';
import {LoginComponent} from '../../auth/form/login/login.component';
import {RegComponent} from '../../auth/form/reg/reg.component';
import {MainChatComponent} from '../../main-chat/main-chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reg',
    component: RegComponent
  },
  {
    path: 'chat',
    component: MainChatComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
