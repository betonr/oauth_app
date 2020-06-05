import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginApplicationComponent } from './login-application/login-application.component';
import { RecoverPasswordComponent } from './recover-password/recover.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recover-pass/:token', component: RecoverPasswordComponent },
  { path: ':app_name/login', component: LoginApplicationComponent },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];

/**
 * Auth Route Module
 * redirects to authentication components with 'auth' before URL
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
