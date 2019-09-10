import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  { path: 'users', component: ListUsersComponent },
  { path: 'users/create', component: CreateUserComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
