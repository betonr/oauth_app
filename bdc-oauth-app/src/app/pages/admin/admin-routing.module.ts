import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MyProfileComponent } from './users/my-profile/my-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  { path: 'users', component: ListUsersComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: 'my', component: MyProfileComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
