import { Component } from '@angular/core';
import { ApplicationsService } from '../applications.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { showLoading, closeLoading } from 'src/app/app.action';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './create-apps.component.html',
  styleUrls: ['./create-apps.component.scss']
})
export class CreateAppsComponent {

  public authorized = null;
  public client = {};
  public formCreateApp: FormGroup;
  public hide = true;

  constructor(
    private as: ApplicationsService,
    private router: Router,
    private store: Store<AuthState>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.formCreateApp = this.fb.group({
      client_name: ['', [Validators.required]],
      client_uri: ['', [Validators.required]],
      redirect_uri: ['', [Validators.required]],
      type_secret: ['', [Validators.required]],
      client_secret: ['', [Validators.required]]
    });
    this.store.pipe(select('auth')).subscribe(res => {
      if (!res.userId || !res.token || !res.grants || res.grants.indexOf('admin') < 0) {
        this.authorized = false;
      } else {
        this.authorized = true;
      }
    });
  }

  public async create() {
    try {
      this.store.dispatch(showLoading());
      if (this.formCreateApp.status === 'VALID') {
        const application = {
          'client_name': this.client['client_name'],
          'client_uri': this.client['client_uri'],
          'redirect_uri': this.client['redirect_uri'],
          'type_secret': this.client['type_secret'],
          'client_secret': this.client['client_secret']
        }
  
        const response = await this.as.createApplication(application);
        if (response) {
          this.snackBar.open('App created!', '', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: 'app_snack-bar-success'
          });
          this.router.navigate(['/admin/apps']);
          
        } else throw 'Error creating App!';
      }

    } catch(err) {
      const msg = err.error && err.error.message ? err.error.message : err.toString();
      this.snackBar.open(msg, '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: 'app_snack-bar-error'
      });
      
    } finally {
      this.store.dispatch(closeLoading());
    }
  }

}
