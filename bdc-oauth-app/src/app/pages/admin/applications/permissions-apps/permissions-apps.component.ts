import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../applications.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';
import { UsersService } from '../../users/users.service';
import { ActivatedRoute } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { closeLoading, showLoading } from 'src/app/app.action';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddPermissionsComponent } from './add-permissions/add-permissions.component';

@Component({
  templateUrl: './permissions-apps.component.html',
  styleUrls: ['./permissions-apps.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PermissionsAppsComponent implements OnInit {

  public displayedColumns: string[];
  public dataSource = [];
  public expandedElement = null;
  public authorized = null;
  public notApps = false;
  public client_id = '';
  public newScope = '';
  private userId = null;

  constructor(
    private as: ApplicationsService,
    private us: UsersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private store: Store<AuthState>) {
      this.store.pipe(select('auth')).subscribe(res => {
        if (res.userId && res.token && res.grants) {
          this.userId = res.userId;
          this.authorized = true;
        } else {
          this.authorized = false;
        }
      });
    }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'email'];
    this.route.paramMap.subscribe(params => {
      this.getUsersByClient(params['params']['id']);
    });
  }

  private async getUsersByClient(client_id) {
    try {
      const response = await this.us.getUsersByApplication(client_id);
      this.dataSource = response.users;
      this.client_id = client_id;

      if (response.users.length === 0) {
        this.notApps = true;
      }

    } catch(err) {
      this.notApps = true;
      if (err.status && err.status == 403) {
        this.authorized = false;
      }
    }
  }

  public getListScopes(scopes) {
    return scopes.substring(1, scopes.length-1).replace(/'/g, '').split(',')
  }

  public async addScope() {
    try {
      this.store.dispatch(showLoading());
      if (!this.newScope) {
        this.snackBar.open('Scope is required!', '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: 'app_snack-bar-error'
        });

      } else {
        const response = await this.as.addScope(this.client_id, this.userId, this.newScope);
        this.snackBar.open('Scope added', '', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: 'app_snack-bar-success'
        });
        this.getUsersByClient(this.client_id);
        this.newScope = '';
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

  public async removeScope(scope, userId) {
    try {
      this.store.dispatch(showLoading());
      const response = await this.as.deleteScope(this.client_id, userId, scope);
      this.snackBar.open('Scope deleted', '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: 'app_snack-bar-success'
      });
      this.getUsersByClient(this.client_id);
      this.newScope = '';

    } catch(err) {
      this.snackBar.open('Error in deleting scope!', '', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: 'app_snack-bar-error'
      });
      
    } finally {
      this.store.dispatch(closeLoading());
    }
  }

  public addPermissionsByUser(): void {
    const dialogRef = this.dialog.open(AddPermissionsComponent, {
      width: '500px',
      disableClose: true,
      data: {
        users: this.dataSource,
        clientId: this.client_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsersByClient(this.client_id);
    });
  }

}
