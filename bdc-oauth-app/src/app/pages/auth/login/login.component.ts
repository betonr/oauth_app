import { Component } from '@angular/core';
import { authCodeFlowConfig } from '../auth.config';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * login page component
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private oauthService: OAuthService) {}

  async loginCode() {
    // Tweak config for code flow
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlow();
  }

}
