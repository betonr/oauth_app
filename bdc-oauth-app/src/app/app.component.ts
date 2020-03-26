import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import { NgxSpinnerService } from 'ngx-spinner';
import { Logout } from './pages/auth/auth.action';
import { Router } from '@angular/router';
import { getCookie } from './shared/helpers/Cookie';

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
    public router: Router
  ) {
    this.store.pipe(select('app')).subscribe(res => {
      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }

      if (!getCookie('oauth.dpi.inpe.br')) {
        this.store.dispatch(Logout());
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
