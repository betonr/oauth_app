import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule'},
  { path: 'admin', component: AdminComponent, loadChildren: './pages/admin/admin.module#AdminModule'},
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' }
];

/**
 * External Route Module (main)
 * has call to the authentication and administrator modules
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
