import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './pages/admin/admin.module';
import * as fromApp from './app.reducer';
import * as fromAuth from './pages/auth/auth.reducer';

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
    StoreModule.forRoot({
      app: fromApp.reducer,
      auth: fromAuth.reducer
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
