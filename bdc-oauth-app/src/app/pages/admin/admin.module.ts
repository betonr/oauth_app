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


@NgModule({
  declarations: [
    AdminComponent,
    ListUsersComponent,
    CreateUserComponent,
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
