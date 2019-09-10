import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material';
import { UsersService } from '../users.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';

@Component({
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  public displayedColumns: string[];
  public dataSource = [];
  public authorized = null;

  constructor(
    private us: UsersService,
    private store: Store<AuthState>) {
      this.store.pipe(select('auth')).subscribe(res => {
        if (res.userId && res.token && res.grants && res.grants.indexOf('admin') >= 0) {
          this.authorized = true;
        } else {
          this.authorized = false;
        }
      });
    }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'email', 'institution', 'occupation', 'date'];
    this.getUsers();
  }

  private async getUsers() {
    try {
      const response = await this.us.getUsers();
      this.dataSource = response.users;
    } catch(err) {
      if (err.status && err.status == 403) {
        this.authorized = false;
      }
    }
  }

  public getDateFormated(date) {
    return new Date(date).toLocaleDateString();
  }
}
