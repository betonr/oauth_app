import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './pages/admin/admin.module';
import * as fromApp from './app.reducer';

/**
 * Initial Module of Application (SPA)
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    OAuthModule.forRoot(),
    StoreModule.forRoot({
      app: fromApp.reducer
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: OAuthStorage, useValue: localStorage }
  ]
})
export class AppModule { }
