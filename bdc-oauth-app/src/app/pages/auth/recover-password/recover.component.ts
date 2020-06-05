import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { closeLoading, showLoading } from 'src/app/app.action';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMsg } from 'src/app/shared/helpers/interfaces';
import { UsersService } from '../../admin/users/users.service';

/**
 * login page component
 */
@Component({
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  public token: string;
  public formChangePass: FormGroup;
  public error: ErrorMsg;

  constructor(
    private us: UsersService,
    private store: Store<AppState>,
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
      this.store.pipe(select('auth')).subscribe(res => {
        if (res.userId && res.token && res.grants) {
          this.router.navigate(['/admin/my']);
        }
      });

      this.formChangePass = this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      });
  }

  ngOnInit() {
    this.validToken(this.route.snapshot.paramMap['params'].token);
  }

  public async validToken(token) {
    try  {
      this.store.dispatch(showLoading());
      const response = await this.us.validTokenPassword(token);
      this.token = token;

    } catch (_) {
      this.router.navigate(['/auth/login']);

    } finally {
      this.store.dispatch(closeLoading());
    }
  }

  public async change() {
    const password = this.formChangePass.get('password').value
    const confirmPassword = this.formChangePass.get('confirmPassword').value

    if (this.formChangePass.status !== 'VALID') {
      this.error = {
        type: 'error',
        message: 'Fill in all fields!'
      };

    } else if(password !== confirmPassword) {
      this.error = {
        type: 'error',
        message: 'Password and password confirm must be the same!'
      };

    } else {
      try {
        this.store.dispatch(showLoading());

        const data = {
          token: this.token,
          password: password,
          confirm_password: confirmPassword,
        };
        const response = await this.us.changePasswordByToken(data);
        this.error = null;
        this.router.navigate(['/auth/login']);
        
        this.snackBar.open('Password changed successfully!', '', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: 'app_snack-bar-success'
        });

      } catch (err) {
        let message = err.error.message ? err.error.message : 'Error updating the password!';
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
