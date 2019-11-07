import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UsersService } from '../../../users/users.service';
import { showLoading, closeLoading } from 'src/app/app.action';
import { AuthState } from 'src/app/pages/auth/auth.state';
import { Store } from '@ngrx/store';
import { ApplicationsService } from '../../applications.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-permissions',
    templateUrl: 'add-permissions.component.html',
    styleUrls: ['add-permissions.component.scss']
})
export class AddPermissionsComponent {

    public usersNotAvailable: object[];
    public usersAvailable: object[];
    public userSelected: string;
    public clientId = '';
    public scope = '';

    constructor(
        private us: UsersService,
        private as: ApplicationsService,
        private snackBar: MatSnackBar,
        private store: Store<AuthState>,
        public router: Router,
        public dialogRef: MatDialogRef<AddPermissionsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: object) {
            this.usersNotAvailable = data['users'];
            this.clientId = data['clientId'];
            this.getUsers();
        }

    private async getUsers() {
        try {
            const response = await this.us.getUsers();
            this.usersAvailable = response.users.filter(user => {
              return this.usersNotAvailable.filter(u =>  u['_id'] == user._id).length <= 0;
            });

        } catch(err) {
            const msg = err.response && err.response.message ? err.response.message : 'Error in adding scope!'
            this.snackBar.open(msg, '', {
                duration: 4000,
                verticalPosition: 'top',
                panelClass: 'app_snack-bar-error'
            });
        }
    }

    public async addScope() {
        try {
          this.store.dispatch(showLoading());
          if (!this.scope || !this.userSelected) {
            this.snackBar.open('Fill in all fields!', '', {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: 'app_snack-bar-error'
            });
    
          } else {
            const response = await this.as.addScope(this.clientId, this.userSelected, this.scope);
            this.snackBar.open('Scope added', '', {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: 'app_snack-bar-success'
            });
            this.close();
          }
    
        } catch(err) {
          this.snackBar.open('Error in adding scope!', '', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: 'app_snack-bar-error'
          });
          
        } finally {
          this.store.dispatch(closeLoading());
        }
      }
    

    public close(): void {
        this.dialogRef.close();
    }

}