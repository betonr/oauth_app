import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { closeLoading, showLoading } from 'src/app/app.action';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Login, Logout } from '../auth.action';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * login page component
 */
@Component({
  templateUrl: './login-application.component.html',
  styleUrls: ['./login-application.component.scss']
})
export class LoginApplicationComponent implements OnInit {

  public username: string;
  public password: string;
  public formLogin: FormGroup;
  public error: object;
  public token: string;
  public application: string;
  public url: string;
  public scope: string;

  ngOnInit(): void {
    this.url = this.route.snapshot.queryParams['url'];
    this.scope = this.route.snapshot.queryParams['scope'];
    this.application = this.route.snapshot.paramMap['params'].app_name;

    if (!this.application) {
      this.router.navigate(['/auth/login']);
    } else {
      if (this.token) {
        this.loginWithToken();
      }
    }
  }

  constructor(
    private as: AuthService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder) {
      this.store.pipe(select('auth')).subscribe(res => {
        if (res.userId && res.token && res.grants) {
          this.token = res.token;
        }
      });

      this.formLogin = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }

  private async loginWithToken() {
    if (this.token) {
      try {
        this.store.dispatch(showLoading());
        const response = await this.as.token(this.token, this.application, this.scope || null);
        this.redirect(response['callback'], this.token, response['token']);

      } catch (err) {
        this.store.dispatch(Logout());
        window.location.href = this.router.url;

      } finally {
        this.store.dispatch(closeLoading());
      }
    }
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
        const responseToken = await this.as.token(response.access_token, this.application, this.scope || null);

        this.store.dispatch(Login({
          userId  : response.user_id,
          grants : response.grants,
          token : response.access_token
        }));
        this.error = {};

        this.redirect(responseToken['callback'], response.access_token, responseToken['token']);

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

  private redirect(baseUrl: string, accessToken: string, token: string) {
    let url = `${baseUrl}?access_token=${accessToken}&token=${token}`;
    if (this.scope) {
      url += `&scope=${this.scope}`;
    }
    window.location.href = url;
  }

}
