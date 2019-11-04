import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material';
import { ApplicationsService } from '../applications.service';
import { Store, select } from '@ngrx/store';
import { AuthState } from 'src/app/pages/auth/auth.state';
import { UsersService } from '../../users/users.service';
import { ActivatedRoute } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  public displayedColumns: string[];
  public dataSource = [];
  public expandedElement = null;
  public authorized = null;
  public notApps = false;
  private userId = null;

  constructor(
    private as: ApplicationsService,
    private us: UsersService,
    private route: ActivatedRoute,
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

}
