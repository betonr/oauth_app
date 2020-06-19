import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

/**
 * Toolbar component
 * top menu of the explore page
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  /** subscribe in store */
  constructor(
    private snackBar: MatSnackBar,
    public router: Router,
    private oauthService: OAuthService) {}

  /** pointer to issue event to explore component */
  @Output() toggleToEmit = new EventEmitter();

  /**
   * emit event to explore when click in menu icon
   */
  toggleDrawer() {
    this.toggleToEmit.emit();
  }

  /**
   * Logout in application and redirect to explore page
   */
  logout() {
    this.oauthService.logOut();
    this.oauthService.revokeTokenAndLogout();
    this.router.navigate(['/auth/login']);
    this.snackBar.open('Logout Successfully!', '', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'app_snack-bar-success'
    });
  }
}
