import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { authCodeFlowConfig } from './pages/auth/auth.config';

/**
 * First application component
 * has only 'router-outlet'
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  /** subscribe in store app */
  constructor(
    private store: Store<AppState>, 
    private spinner: NgxSpinnerService,
    private oauthService: OAuthService,
    public router: Router
  ) {
    this.store.pipe(select('app')).subscribe(res => {
      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });

    this.configureCodeFlow();
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => this.oauthService.loadUserProfile());
  }

  private configureCodeFlow() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocument();
  }
}
