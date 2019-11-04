import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material';
import { ApplicationsService } from '../applications.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';

@Component({
  templateUrl: './list-apps.component.html',
  styleUrls: ['./list-apps.component.scss']
})
export class ListAppsComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  public displayedColumns: string[];
  public dataSource = [];
  public authorized = null;
  public notApps = false;
  private userId = null;

  constructor(
    private as: ApplicationsService,
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
    this.displayedColumns = ['client_name', 'client_uri', 'redirect_uri', 'created_at', 'expired_at', 'actions'];
    this.getClients();
  }

  private async getClients() {
    try {
      const response = await this.as.getApplications(this.userId);
      this.dataSource = response.clients;
      if (response.clients.length === 0) {
        this.notApps = true;
      }

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

  public getUrlEdit(element) {
    return `/admin/apps/${element._id}`;
  }

  public getUrlPermissions(element) {
    return `/admin/apps/${element._id}/permissions`;
  }
}
