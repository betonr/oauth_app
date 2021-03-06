import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { closeLoading, showLoading } from 'src/app/app.action';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Login } from '../auth.action';
import { Router } from '@angular/router';

/**
 * login page component
 */
@Component({
  selector: 'app-dialog-feature',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public username: string;
  public password: string;
  public formLogin: FormGroup;
  public error: object;

  constructor(
    private as: AuthService,
    private store: Store<AppState>,
    public router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
      this.store.pipe(select('auth')).subscribe(res => {
        if (res.userId && res.token && res.grants) {
          this.router.navigate(['/admin/users']);
        }
      });

      this.formLogin = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  public async login() {
    if (this.formLogin.status !== 'VALID') {
      this.error = {
        type: 'error',
        message: 'Fill in all fields!'
      };
    } else {
      try {
        this.store.dispatch(showLoading());

        const credentials = {
          username: this.username,
          password: this.password
        };
        const response = await this.as.login(credentials);
        // TODO: 
        this.store.dispatch(Login({
          userId  : response.user_id,
          grants : ['admin'],
          token : response.access_token
        }));
        this.error = {};
        this.router.navigate(['/admin/users']);
        
        this.snackBar.open('Login Successfully!', '', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'app_snack-bar-success'
        });

      } catch (err) {
        const message = err.error.message ? err.error.message : 'Authentication Error!';
        this.error = {
          type: 'error',
          message
        };

      } finally {
        this.store.dispatch(closeLoading());
      }
    }
  }

}
