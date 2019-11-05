import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';

import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormFieldErrorComponent } from './components/form-field-input/form-field-error.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog.component';

/**
 * Shared Module
 * used to export components, services and models common in this application
 */
@NgModule({
  declarations: [
    FooterComponent,
    LoadingComponent,
    FormFieldErrorComponent,
    AlertComponent,
    ConfirmDialog
  ],
  exports: [
    FooterComponent,
    AlertComponent,
    FormFieldErrorComponent,
    LoadingComponent,
    ConfirmDialog
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    ConfirmDialog
  ]
})
export class SharedModule { }
