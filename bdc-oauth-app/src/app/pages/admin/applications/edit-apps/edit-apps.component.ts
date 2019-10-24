import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../applications.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../users/users.service';
import { showLoading, closeLoading } from 'src/app/app.action';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './edit-apps.component.html',
  styleUrls: ['./edit-apps.component.scss']
})
export class EditAppsComponent implements OnInit {

  public authorized = null;
  public notApps = null;
  public client = {};
  public formEditApp: FormGroup;
  public authors: object[];
  public authorsAvailable: object[];
  public hide = true;
  private userId = null

  constructor(
    private as: ApplicationsService,
    private us: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AuthState>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.formEditApp = this.fb.group({
      client_name: ['', [Validators.required]],
      client_uri: ['', [Validators.required]],
      redirect_uri: ['', [Validators.required]],
      type_secret: ['', [Validators.required]],
      client_secret: ['', [Validators.required]]
    });
    this.store.pipe(select('auth')).subscribe(res => {
      if (!res.userId && !res.token || !res.grants) {
        this.authorized = false;
      } else {
        this.userId = res.userId;
        this.authorized = true;
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getClient(params['params']['id']);
    });
  }

  private async getClient(id) {
    try {
      const response = await this.as.getApplicationById(id);
      this.client = response;
      
      const responseUsers = await this.us.getUsers();
      this.authorsAvailable = responseUsers.users
        .filter(user => this.client['user_id'].indexOf(user['_id']) < 0)
        .map( user => {
          return {
            '_id': user._id,
            'name': user.name
          }
        })
      this.authors = responseUsers.users
        .filter(user => this.client['user_id'].indexOf(user['_id']) >= 0)
        .map( user => {
          return {
            '_id': user._id,
            'name': user.name
          }
        })

    } catch(err) {
      this.notApps = true;
      if (err.status && err.status == 403) {
        this.authorized = false;
      }
    }
  }

  public getDateFormated(date) {
    return new Date(date).toLocaleDateString();
  }

  public async update() {
    try {
      this.store.dispatch(showLoading());
      if (this.formEditApp.status === 'VALID') {
        const application = {
          'client_name': this.client['client_name'],
          'client_uri': this.client['client_uri'],
          'redirect_uri': this.client['redirect_uri'],
          'type_secret': this.client['type_secret'],
          'client_secret': this.client['client_secret']
        }
  
        const response = await this.as.updateApplicationById(this.client['_id'], application);
        if (response) {
          this.snackBar.open('Successfully edited Client!', '', {
            duration: 4000,
            verticalPosition: 'top',
            panelClass: 'app_snack-bar-success'
          });
          
        } else throw 'Error updating Client!';
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

  public async removeAuthor(id) {
    try {
      this.store.dispatch(showLoading());

      const response = await this.as.removeAuthorById(this.client['_id'], id);
      if (response) {
        this.snackBar.open('Author removed!', '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: 'app_snack-bar-success'
        });

        if (id === this.userId) {
          this.router.navigate(['/admin/my']);
        } else {
          this.getClient(this.client['_id']);
        }

      } else throw 'Remove error';

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
