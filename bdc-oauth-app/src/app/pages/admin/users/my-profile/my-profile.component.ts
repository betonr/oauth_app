import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { closeLoading, showLoading } from 'src/app/app.action';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserPassword, UserAdditional } from '../user.interface';

@Component({
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public userInfo: object;
  public aditionalInfos: UserAdditional;
  public pass: UserPassword;
  public formEditUser: FormGroup;
  public hide = true;
  public userId = null;
  public changePassword = false;

  constructor(
    private us: UsersService,
    private store: Store<AuthState>,
    private snackBar: MatSnackBar,
    public router: Router,
    private fb: FormBuilder) {
      this.formEditUser = this.fb.group({
        institution: ['', [Validators.required]],
        occupation: [''],
        old_password: [''],
        password: [''],
        confirm_password: [''],
        changePassword: ['']
      });
    }

  ngOnInit() {
    this.resetForm(false);
    // this.getUserInfo();
  }

  private resetForm(onlyPass: boolean) {
    if (!onlyPass) {
      this.aditionalInfos = {
        institution: '',
        occupation: ''
      }
    }

    this.pass = {
      old_password: '',
      password: '',
      confirm_password: ''
    }
    this.changePassword = false;
  }

  private async getUserInfo() {
    try {
      const response = await this.us.getUserById();
      console.log(response)
      // this.userInfo = response;
      // this.aditionalInfos.institution = this.userInfo['institution']; 
      // this.aditionalInfos.occupation = this.userInfo['occupation']; 

    } catch(err) {}
  }
  
  public async update() {
    try {
      this.store.dispatch(showLoading());
      if (this.formEditUser.status === 'VALID') {
        if (this.changePassword) {
          if (this.pass['password'] !== this.pass['confirm_password']) throw 'Password and password confirmation must match!';
          else {
            // change password 
            const responseReqPass = await this.us.changePass(this.userId, this.pass);
            if (responseReqPass) {
              // change basic infos
              this.updateBasicInfo();
            }
          }
        } else {
          this.updateBasicInfo();
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
      this.resetForm(true);
      this.store.dispatch(closeLoading());
    }
  }

  public async updateBasicInfo() {
    try {
      const user = {
        ...this.aditionalInfos
      }

      const response = await this.us.update(this.userId, user);
      if (response) {
        this.snackBar.open('Successfully edited User!', '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: 'app_snack-bar-success'
        });
      } else throw 'Error updating User!';

    } catch(err) {
      throw err;      
    }
  }

  public getDateFormated(date: string) {
    return new Date(date).toLocaleDateString();
  }
}
