import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthState } from '../auth/auth.state';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { getCookie } from 'src/app/shared/helpers/Cookie';
import { Logout } from '../auth/auth.action';


@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  /** select data of the store application */
  constructor(
    private store: Store<AuthState>,
    public router: Router) {
    this.store.pipe(select('auth')).subscribe(res =>  {
      if (!res.userId || !res.token || !res.grants) {
        this.router.navigate(['/auth/login']);
      }
    });

    if (!getCookie('oauth.dpi.inpe.br')) {
      this.store.dispatch(Logout());
      this.router.navigate(['/auth/login']);
    }
  }

  /** component reference sidenav */
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  /**
   * toggleDrawer - enable or disable the side menu of the map page
   */
  toggleDrawer() {
    this.sidenav.toggle();
  }
}
