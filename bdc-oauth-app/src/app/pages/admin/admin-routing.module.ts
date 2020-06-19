import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MyProfileComponent } from './users/my-profile/my-profile.component';
import { ListAppsComponent } from './applications/list-apps/list-apps.component';
import { EditAppsComponent } from './applications/edit-apps/edit-apps.component';
import { CreateAppsComponent } from './applications/create-apps/create-apps.component';
import { PermissionsAppsComponent } from './applications/permissions-apps/permissions-apps.component';


const routes: Routes = [
  // { path: 'users', component: ListUsersComponent },
  // { path: 'apps', component: ListAppsComponent },
  // { path: 'apps/create', component: CreateAppsComponent },
  // { path: 'apps/:id/permissions', component: PermissionsAppsComponent },
  // { path: 'apps/:id', component: EditAppsComponent },
  // { path: 'users/create', component: CreateUserComponent },
  { path: 'my', component: MyProfileComponent },
  { path: '', redirectTo: '/dash/my', pathMatch: 'full' } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
