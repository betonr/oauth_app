import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatRadioModule,
  MatInputModule,
  MatBottomSheetModule,
  MatMenuModule,
  MatSidenavModule,
  MatTableModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import { AuthModule } from '../auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MyProfileComponent } from './users/my-profile/my-profile.component';
import { ListAppsComponent } from './applications/list-apps/list-apps.component';
import { EditAppsComponent } from './applications/edit-apps/edit-apps.component';
import { CreateAppsComponent } from './applications/create-apps/create-apps.component';
import { PermissionsAppsComponent } from './applications/permissions-apps/permissions-apps.component';


@NgModule({
  declarations: [
    AdminComponent,
    ListUsersComponent,
    CreateUserComponent,
    ListAppsComponent,
    EditAppsComponent,
    CreateAppsComponent,
    PermissionsAppsComponent,
    MyProfileComponent,
    SidenavComponent,
    ToolbarComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    AdminRoutingModule,
    MatSelectModule,
    MatExpansionModule,
    MatRadioModule,
    MatBottomSheetModule,
    MatInputModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatMenuModule
  ]
})
export class AdminModule { }
