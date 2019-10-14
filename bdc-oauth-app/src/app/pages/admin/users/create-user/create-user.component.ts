import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { closeLoading, showLoading } from 'src/app/app.action';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public user: object;
  public formCreateUser: FormGroup;
  public authorized = null;
  public hide = true;

  constructor(
    private us: UsersService,
    private store: Store<AuthState>,
    private snackBar: MatSnackBar,
    public router: Router,
    private fb: FormBuilder) {
      this.store.pipe(select('auth')).subscribe(res => {
        if (res.userId && res.token && res.grants && res.grants.indexOf('admin') >= 0) {
          this.authorized = true;
        } else {
          this.authorized = false;
        }
      });
      this.formCreateUser = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        institution: ['', [Validators.required]],
        occupation: [''],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
        admin: ['']
      });
    }

  ngOnInit() {
    this.resetForm();
  }

  private resetForm() {
    this.user = {
      name: '',
      email: '',
      institution: '',
      occupation: [],
      password: '',
      confirm_password: '',
      admin: false
    }
  }
  
  public async create() {
    try {
      this.store.dispatch(showLoading());
      if (this.formCreateUser.status === 'VALID') {
        if (this.user['password'] !== this.user['confirm_password']) throw 'Password and password confirmation must match!';
        else {
          const response = await this.us.create(this.user);
          if (response) {
            this.snackBar.open('Successfully created User!', '', {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: 'app_snack-bar-success'
            });
            this.router.navigate(['/admin/my']);
          } else throw 'Error creating User!';
        }
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
